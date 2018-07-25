import Vapor

private let blogRedirects = [
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

final class Routes: RouteCollection {
    let view: ViewRenderer
    init(_ view: ViewRenderer) {
        self.view = view
    }

    func build(_ builder: RouteBuilder) throws {
        /// GET /
        builder.get { req in
            return try self.view.make("hello")
        }

        // response to requests to /info domain
        // with a description of the request
        builder.get("info") { req in
            return req.description
        }

        blogRedirects.forEach { (key, value) in
            builder.get(key) { req in
                return Response(redirect: "https://blog.natanrolnik.me/\(value)",
                                .permanent)
            }
        }
    }
}
