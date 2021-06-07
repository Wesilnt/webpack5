#### 预获取/预加载模块(prefetch/preload module) 

+ https://webpack.docschina.org/guides/code-splitting/#prefetchingpreloading-modules
+ webpack v4.6.0+ 增加了对预获取和预加载的支持。
  
  在声明 import 时，使用下面这些内置指令，可以让 webpack 输出 "resource hint(资源提示)"，来告知浏览器：
  
  + prefetch(预获取)：将来某些导航下可能需要的资源
  + preload(预加载)：当前导航下可能需要资源
  
+ 用例：import(/* webpackPrefetch: true */ './path/to/LoginModal.js');

+ 与 prefetch 指令相比，preload 指令有许多不同之处：
  
  + preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
  + preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
  + preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
  + 浏览器支持程度不同。
  
  ### 构建性能
  
  ##### 解析 
  
  以下步骤可以提高解析速度：
  
  + 减少 resolve.modules, resolve.extensions, resolve.mainFiles, resolve.descriptionFiles 中条目数量，因为他们会增加文件系统调用的次数。
  + 如果你不使用 symlinks（例如 npm link 或者 yarn link），可以设置 resolve.symlinks: false。
  + 如果你使用自定义 resolve plugin 规则，并且没有指定 context 上下文，可以设置 resolve.cacheWithContext: false。