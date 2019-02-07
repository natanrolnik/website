import Vapor

private let blogRedirects = [
    "2014/01/17/an-introduction-to-afnetworking-2-and-nsurlsession": "afnetworking-2",
    "2014/03/26/my-intersection/": "my-intersection",
    "2014/04/09/write-the-code-spread-the-love-change-the-world/": "wwdc-14-spread-the-love",
    "2014/05/09/tehilim-in-the-post-pc-era/": "tehilim-post-pc-era",
    "2015/02/04/you-may-ask-yourself-how-can-i-start-developing-apps-and-i-can-answer/": "how-i-learned-to-code",
    "2015/08/09/empathy/": "empathy",
    "2015/10/21/introduction-to-fastlane-and-integrating-it-with-circleci-to-deploy-beta-with-crashlytics-fabric/": "integrating-fastlane-with-circle-ci",
    "2016/01/31/thoughts-on-the-parse-shutdown-how-the-terrible-news-became-the-best-thing-to-happen-to-my-app/": "parse-shutdown",
    "2016/03/31/migrating-my-data-from-parse/": "migrating-my-parse-data",
    "2016/06/05/wwdc-16-past-and-future/": "wwdc16-past-and-future",
]

public func routes(_ router: Router) throws {
    // "It works" page
    router.get { req in
        return try req.view().render("hello")
    }

    router.get("/uptime/check") { _ in
        return "ok"
    }

    blogRedirects.forEach {
        let oldPath = $0.key
        let newPath = $0.value
        router.get(oldPath) { req -> Response in
            let newURLString = "https://blog.natanrolnik.me/\(newPath)"
            return req.redirect(to: newURLString, type: .permanent)
        }
    }
}
