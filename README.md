# vue-cli-vue-router-webpack
在vue-cli+vue-router+webpack基础上简单修改配置实现根据路由实现代码切割和懒加载

## vue-cli让我们能快速构建一个大型单页面web应用，帮我们一键配置了路由和状态管理，热加载，打包webpack配置都一应俱全。下面讲解修改几个地方来实现根据路由切割代码并实现懒加载。

### 懒加载的必要性和实现原理
   大型单页面应用往往代码量庞大，打包后的js文件大小高大几M甚至十几M，从输入网址到页面显现需要加载几M的文件并解析运行，用户等待时间较长，造成不好的用户体验。实际上，页面的首次显示并不需要加载所有的组件代码，甚至有些组件从用户打开网址到关闭网页都不会使用到，那么按某种方式将代码切割并按需加载就能大幅提高加载速度，改善用户体验。单页面的路由是页面状态的主要表征，自然想到按路由来切割代码。

## Quick Start

Install dependencies to init project:


		
		git clone git@github.com:limianhust/vue-vue-router-webpack.git
		
		
		Start local server to launch project:
		
		cd YourProjectName
		npm run build
		npm run start
		

打包编译后可以看到dist目录下：

		|--dist
		   |--static
		   |  |--css
		   |     |--app.[hash].css
		   |     |--app.[hash].css.map
		   |  |--js
		   |     |--app.[hash].js
		   |     |--app.[hash].js.map
		   |     |--mainifest.[hash].js
		   |     |--mainifest.[hash].js.map
		   |     |--vendor.[hash].js
		   |     |--vendor.[hash].js.map
		   |--index.html
所以组件代码集中在 app.js 里，依赖库集中在 vendor.js 里。下面修改配置
### 1. 首先修改webpack配置，找到webpack.base.conf.js文件，
增加一行代码


    output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
    },
    变成：
    output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: '[name].bundle.js'
    },


然后到router文件夹里找到index.js文件，要切割的组件引入写法：

    import Hello from '@/components/Hello'
    import topSide from '@/components/topSide'
   
    改成

    const Hello = () => import('@/components/Hello')
    const topSide = () => import('@/components/topSide')

然后打包，我们就会发现js文件多了两个 0.[hash].js和1.[hash].js文件，
    这就是切割出来的代码。只要用户继续操作进入相应的路由，这两个文件才会请求加载。

		|--dist
		   |--static
		   |  |--css
		   |     |--app.[hash].css
		   |     |--app.[hash].css.map
		   |  |--js
		   |     |--0.[hash].js
		   |     |--0.[hash].js.map
		   |     |--1.[hash].js
		   |     |--1.[hash].js.map
		   |     |--app.[hash].js
		   |     |--app.[hash].js.map
		   |     |--mainifest.[hash].js
		   |     |--mainifest.[hash].js.map
		   |     |--vendor.[hash].js
		   |     |--vendor.[hash].js.map
		   |--index.html 