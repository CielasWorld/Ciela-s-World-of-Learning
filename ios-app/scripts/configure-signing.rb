require 'xcodeproj'

project = Xcodeproj::Project.open('ios/App/App.xcodeproj')
app = project.targets.find { |target| target.name == 'App' && target.product_type == 'com.apple.product-type.application' }
abort 'Expected one App application target' unless app
app.build_configurations.each do |configuration|
  next unless configuration.name == 'Release'
  configuration.build_settings['DEVELOPMENT_TEAM'] = '7QNNH4CG65'
  configuration.build_settings['CODE_SIGN_STYLE'] = 'Manual'
  configuration.build_settings['CODE_SIGN_IDENTITY'] = 'Apple Distribution'
  configuration.build_settings['PROVISIONING_PROFILE_SPECIFIER'] = '08fd1ba8-b7ce-4181-ae04-fad6d638a4c4'
  configuration.build_settings['PRODUCT_BUNDLE_IDENTIFIER'] = 'org.cielasworld.learning'
  configuration.build_settings['MARKETING_VERSION'] = '1.0'
end
project.save
