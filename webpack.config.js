const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
    return {
        // 모드가 production이냐 development냐에 따라 최적화가 달라짐
        mode: process.env.NODE_ENV === "production" ? "production" : "development",
        /**
         * entry point란 진입점에 해당함. 
         * 진입점 파일을 기준으로 모든 js, css파일들을 묶어 하나의 js로 만들어주며, 
         * 기준점에 있는 모든 이미지나 파일들을 output 파일로 반환해준다.
         * 이를 번들링이라고 한다.
         * 번들링: 여러개의 파일(.js, .css, .png 등 파일들)을 하나의 파일로 묶어 패키징을 시키는 과정
         *  */
        entry: "./src/index.js",
        /**
         * output은 번들링된 코드를 어떤 경로에 어떤 js이름으로 생성할 것인가 설정하는 것이다.
         * filename은 파일이름을 어떻게 내보낼 것인가 인데 보통은 지정한이름.bundle.js를 통상적으로 사용
         * path는 디렉토리에서 어느 경로에 번들링한 파일을을 생성할 것인가 지정하는 것.
         */
        output: {
            filename: "react.bundle.js",
            path: __dirname + "/build"
        },
        /**
         * resolve는 모듈의 해석방식을 설정하는 것이다.
         * 
         * extensions는 탐색할 모듈의 확장자를 지정하는 것
         * 
         */
        resolve: {
            extensions: [".js", ".jsx"]
        },
        /**
         * 의존성 트리 내의 모듈 처리 방식을 설정하는 것이다.
         * 
         * 로더란?
         * 모듈의 소=
         * 
         * 예를들어 import라는 구문으로 우리가 패키지를 가져오지만 이 코드를 commonJs(표준 자바스크립트)코드로
         * require("")이라는 것을 사용하여 패키지를 가져오는 것과 비슷한 원리
         */
        module: {
            rules: [
                {
                    // test란 정규표현식으로 적용되는 파일들을 설정
                    test: /\.(js|jsx)$/,
                    // exclude 컴파일하지 않을 폴더 설정
                    exclude: "/node_modules/",
                    // loader 사용할 로더
                    // babel-loader는 최신 자바스크립트 문법(ES6, ES2020, ES2019 등등)을 commonJS로 변환 시켜줄수 있도록 도와주는 로더
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ]
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            //CSS를 DOM에 삽입하는 로더
                            loader: "style-loader"
                        },
                        {
                            // import로 불러온 css파일을 해석하는 로더
                            loader: "css-loader"
                        }
                    ],
                },
                {
                    // file-loader는 import/ require()로 가져온 파일들을 output으로 생성하는것.
                    test: /\.(png|jpe?g|gif|mp3|mp4|wav|wma|ogg|ttf|woff2|woff|eot|svg|ico)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                // 전체 디렉토리 구조를 유지하며 파일을 내보내려면 다음처럼 하면된다.
                                name: '[path][name].[ext]'
                            },

                        },
                    ],
                }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html'
            })
        ]
    }
}