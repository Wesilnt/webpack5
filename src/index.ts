import styles from './index.css';
// @ts-ignore
import BG1 from './assets/bg1.png';

import Print from './utils/print';
import App from './app';

App();

function getComponent() {
  return import('lodash-es/join')
    .then(({ default: _ }) => {
      const element = document.createElement('div');
      element.innerHTML = _(['Webpack', '5', 'loaded!'], ' ');
      element.classList.add(styles.hello);
      element.onclick = () => {
        // Print(join(['Webpack', '5', 'loaded!'], ' '))
      };

      // 将图像添加到我们已经存在的 div 中。
      const myIcon = new Image();
      myIcon.src = BG1;

      element.appendChild(myIcon);
      return element;
    })
    .catch(err => err);
}
