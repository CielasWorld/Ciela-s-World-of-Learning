import XCTest

final class ReleaseUITests: XCTestCase {
    func testEveryActivityOpensAndCaptureScreenshots() throws {
        continueAfterFailure = false
        let app = XCUIApplication(bundleIdentifier: "org.cielasworld.learning")
        app.launch()
        XCTAssertTrue(app.webViews.firstMatch.waitForExistence(timeout: 30))
        let begin = app.staticTexts["Tap anywhere to begin"]
        XCTAssertTrue(begin.waitForExistence(timeout: 30))
        begin.tap()
        let numbers = app.buttons.matching(NSPredicate(format: "label CONTAINS %@", "Numbers")).firstMatch
        XCTAssertTrue(numbers.waitForExistence(timeout: 20), app.debugDescription)
        capture("01-learning-menu", app)

        let activities = ["Numbers", "Counting", "Shapes", "Colors", "Letters", "Small Letters", "Chispa's Cards", "Calm-Down Clouds", "Ciela's Crystals", "Stepping Stones", "Word Bridge"]
        for (index, name) in activities.enumerated() {
            let tile = app.buttons.matching(NSPredicate(format: "label CONTAINS %@", name)).firstMatch
            XCTAssertTrue(tile.exists, "Missing activity: \(name)")
            if !tile.isHittable { app.swipeUp() }
            tile.tap()
            if name == "Stepping Stones" || name == "Word Bridge" {
                let beginner = app.buttons.matching(NSPredicate(format: "label CONTAINS %@", "Cloud Beginner")).firstMatch
                XCTAssertTrue(beginner.waitForExistence(timeout: 10))
                beginner.tap()
            }
            let home = app.buttons["Back to the games"]
            XCTAssertTrue(home.waitForExistence(timeout: 10), "Missing navigation in \(name)")
            // Allow the bundled art and layout transition to settle before capture.
            Thread.sleep(forTimeInterval: 2)
            capture(String(format: "%02d", index + 2) + "-" + name.replacingOccurrences(of: " ", with: "-"), app)
            if home.isHittable { home.tap() }
            else { app.buttons["Other games"].firstMatch.tap() }
            XCTAssertTrue(numbers.waitForExistence(timeout: 10), "Could not return from \(name)")
        }
    }

    private func capture(_ name: String, _ app: XCUIApplication) {
        let attachment = XCTAttachment(screenshot: app.screenshot())
        attachment.name = name
        attachment.lifetime = .keepAlways
        add(attachment)
    }
}
