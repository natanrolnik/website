import Vapor

private let blogRedirects = [
    "2014/03/26/my-intersection/": "my-intersection",
    "2016/06/05/wwdc-16-past-and-future/": "wwdc16-past-and-future",
    "2015/08/09/empathy/": "empathy",
    "2015/02/04/you-may-ask-yourself-how-can-i-start-developing-apps-and-i-can-answer/": "how-i-learned-to-code",
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
