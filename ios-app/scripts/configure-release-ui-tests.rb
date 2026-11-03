require 'xcodeproj'

project_path = 'ios/App/App.xcodeproj'
project = Xcodeproj::Project.open(project_path)
app = project.targets.find { |target| target.name == 'App' }
raise 'App target missing' unless app
tests = project.new_target(:ui_test_bundle, 'ReleaseUITests', :ios, '15.0')
tests.add_dependency(app)
tests.build_configurations.each do |config|
  config.build_settings['PRODUCT_BUNDLE_IDENTIFIER'] = 'org.cielasworld.learning.ReleaseUITests'
  config.build_settings['GENERATE_INFOPLIST_FILE'] = 'YES'
  config.build_settings['SWIFT_VERSION'] = '5.0'
  config.build_settings['TEST_TARGET_NAME'] = 'App'
  config.build_settings['TARGETED_DEVICE_FAMILY'] = '1,2'
  config.build_settings['CODE_SIGNING_ALLOWED'] = 'NO'
end
group = project.main_group.new_group('ReleaseUITests')
source = group.new_file('../../release/ReleaseUITests.swift')
tests.source_build_phase.add_file_reference(source)
project.save
scheme = Xcodeproj::XCScheme.new
scheme.add_build_target(app)
scheme.add_build_target(tests)
scheme.add_test_target(tests)
scheme.set_launch_target(app)
scheme.save_as(project_path, 'ReleaseScreenshots', true)
