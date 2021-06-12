if (!self.define) {
  const e = (e) => {
      "require" !== e && (e += ".js");
      let a = Promise.resolve();
      return (
        s[e] ||
          (a = new Promise(async (a) => {
            if ("document" in self) {
              const s = document.createElement("script");
              (s.src = e), document.head.appendChild(s), (s.onload = a);
            } else importScripts(e), a();
          })),
        a.then(() => {
          if (!s[e]) throw new Error(`Module ${e} didn’t register its module`);
          return s[e];
        })
      );
    },
    a = (a, s) => {
      Promise.all(a.map(e)).then((e) => s(1 === e.length ? e[0] : e));
    },
    s = { require: Promise.resolve(a) };
  self.define = (a, i, c) => {
    s[a] ||
      (s[a] = Promise.resolve().then(() => {
        let s = {};
        const r = { uri: location.origin + a.slice(1) };
        return Promise.all(
          i.map((a) => {
            switch (a) {
              case "exports":
                return s;
              case "module":
                return r;
              default:
                return e(a);
            }
          })
        ).then((e) => {
          const a = c(...e);
          return s.default || (s.default = a), s;
        });
      }));
  };
}
define("./sw.js", ["./workbox-cd8c6cdf"], function (e) {
  "use strict";
  self.addEventListener("message", (e) => {
    e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        {
          url: "asset-manifest.json",
          revision: "09d77782a8bb2d4cc5ab9b121bc7a509",
        },
        {
          url: "images/flowers128.png",
          revision: "f0e785aa1c6a9646a8cae923f4243c0e",
        },
        {
          url: "images/flowers16.png",
          revision: "a55428ba1961981514c1c1a89a666a99",
        },
        {
          url: "images/flowers24.png",
          revision: "83ae4aa84a3b3c3975a5b42947f0022e",
        },
        {
          url: "images/flowers32.png",
          revision: "e57d8916322a6a3ae199922b8d425765",
        },
        {
          url: "images/flowers512.png",
          revision: "ed5d1bd9e874dd912d7a87f7feb61dc0",
        },
        {
          url: "images/flowers64.png",
          revision: "cd2fed6acaa5b993b08afdf8eec49e0e",
        },
        {
          url: "images/maskable_icon.png",
          revision: "78ce64c9984d0a07b6ea271e5fd61d7b",
        },
        { url: "index.html", revision: "d6c3f5e47e03413d47ee69178d11e985" },
        { url: "manifest.json", revision: "47bc7387ed2eeff48deb9c69416639ee" },
        { url: "offline.html", revision: "a19ed5a0f20da6308c088ec94afd25b2" },
        {
          url: "service-worker.js",
          revision: "262f5042e4dea30799b59c5f35598890",
        },
        {
          url: "static/css/main.b45e1b1d.css",
          revision: "d67b44ae2ce91d91ff67552e8cefcacc",
        },
        {
          url: "static/js/0.0ffee03f.chunk.js",
          revision: "9970e9787f6629aef66541cafd9666b6",
        },
        {
          url: "static/js/1.ed71b2fc.chunk.js",
          revision: "62088f34c71cf944e30300eef86fd16a",
        },
        {
          url: "static/js/10.24000860.chunk.js",
          revision: "ccbd35d165d71992860e4d83c490e6fd",
        },
        {
          url: "static/js/11.66a56410.chunk.js",
          revision: "fb57669317b0233a6e8fd381035e9e16",
        },
        {
          url: "static/js/12.72ad412e.chunk.js",
          revision: "fa962d460f7b6c3dbf42372d4546977d",
        },
        {
          url: "static/js/13.a45183f4.chunk.js",
          revision: "18a89c29dcb91e57f11bd491d0b2bf76",
        },
        {
          url: "static/js/14.ebafabd4.chunk.js",
          revision: "b8a7460dfca54b55d7120228c229e726",
        },
        {
          url: "static/js/15.1fc9b47c.chunk.js",
          revision: "e2bc08a13ff33224608569b44ffe4b5a",
        },
        {
          url: "static/js/16.9b2135e9.chunk.js",
          revision: "a94f7f5ccc76e8539d7ef549a4a284fe",
        },
        {
          url: "static/js/17.ef5ff360.chunk.js",
          revision: "85be731a833b08c3935c2f60721a7657",
        },
        {
          url: "static/js/18.2ef68e6a.chunk.js",
          revision: "d6a1a6ca9e8b0a95cb73e21ad8cba40b",
        },
        {
          url: "static/js/19.ce39ac5d.chunk.js",
          revision: "3c7a78749764c755f9b3305fb6660e4d",
        },
        {
          url: "static/js/2.28b9dacf.chunk.js",
          revision: "f6d56620d700f1cf96c47eda1157d854",
        },
        {
          url: "static/js/20.414a7fd8.chunk.js",
          revision: "341084db6845cfc00389ac35b070873e",
        },
        {
          url: "static/js/21.6c28f5cc.chunk.js",
          revision: "be8f03038174bb59a334276d100a032a",
        },
        {
          url: "static/js/3.9d93cd8b.chunk.js",
          revision: "ec8a7ee4a28195ffc44c2a59bd81f96e",
        },
        {
          url: "static/js/4.d1c2bd11.chunk.js",
          revision: "3e898c60d2fe12460741f3fdf0499330",
        },
        {
          url: "static/js/5.cf2ec6b6.chunk.js",
          revision: "bb923ef2ae10db708119b2604b29b9ab",
        },
        {
          url: "static/js/6.e1a0d255.chunk.js",
          revision: "96ae5310cd3562abc2726e8cdd06bb5f",
        },
        {
          url: "static/js/7.5baa6a49.chunk.js",
          revision: "11c4a57d1bb0c556968164e4bfce0241",
        },
        {
          url: "static/js/8.5f4d8609.chunk.js",
          revision: "098447cccf8ad62b5722798eeb958ae0",
        },
        {
          url: "static/js/9.a4b908a2.chunk.js",
          revision: "fdd9392a2625c1c01eb69ccaa3527321",
        },
        {
          url: "static/js/main.8c2cb73c.js",
          revision: "7716306e2fa2d95aa442d169899e5608",
        },
        {
          url: "static/media/Far_Nazanin.301b7724.ttf",
          revision: "301b77248fb55a9c35a155c156cb7d41",
        },
        {
          url: "static/media/Far_Nazanin.572b8c16.woff",
          revision: "572b8c169b66614d8306997e7ce63200",
        },
        {
          url: "static/media/Far_Nazanin.59e72dbd.eot",
          revision: "59e72dbd896efe4a4b22ab814bc76d2b",
        },
        {
          url: "static/media/Far_Nazanin.d98ae0c3.svg",
          revision: "d98ae0c34b1c933d2ee44a161c1de1e2",
        },
        {
          url: "static/media/fontawesome-webfont.674f50d2.eot",
          revision: "674f50d287a8c48dc19ba404d20fe713",
        },
        {
          url: "static/media/fontawesome-webfont.912ec66d.svg",
          revision: "912ec66d7572ff821749319396470bde",
        },
        {
          url: "static/media/fontawesome-webfont.af7ae505.woff2",
          revision: "af7ae505a9eed503f8b8e6982036873e",
        },
        {
          url: "static/media/fontawesome-webfont.b06871f2.ttf",
          revision: "b06871f281fee6b241d60582ae9369b9",
        },
        {
          url: "static/media/fontawesome-webfont.fee66e71.woff",
          revision: "fee66e712a8a08eef5805a46892932ad",
        },
        {
          url: "static/media/WorldMap.2586dc1b.svg",
          revision: "2586dc1b57399af8d20550182312501e",
        },
        {
          url: "static/media/Yekan.05727d32.woff",
          revision: "05727d32400b2008acbf7fc49251ede0",
        },
        {
          url: "static/media/Yekan.1008c3b8.ttf",
          revision: "1008c3b88ceb6f09efbf88dafa3e9d91",
        },
        {
          url: "static/media/Yekan.73b19890.eot",
          revision: "73b19890a21f1d83072d3a08bd75d0bb",
        },
        {
          url: "static/media/Yekan.77c6c4d7.svg",
          revision: "77c6c4d79045178bda720f56e2e026b7",
        },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    );
});
//# sourceMappingURL=sw.js.map
