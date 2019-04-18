import { LitElement, html, css } from 'lit-element';
import { openWc } from './open-wc-logo';

class MyApp extends LitElement {

  static get properties() {
    return {
      response: { type: Object },
      toc: {type: Array},
      showContents: {type: Boolean}
    }
  }

  static get styles() {
    return [
      css`
        :host {
          text-align: left;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: left;
          justify-content: top;
          font-size: calc(10px + 2vmin);
          color: #1a2b42;
        }

        header {
          margin: auto;
        }

        svg {
          animation: app-logo-spin infinite 20s linear;
        }

        a {
          color: #217ff9;
        }

        .app-footer {
          color: #a8a8a8;
          font-size: calc(10px + 0.5vmin);
        }

        .main {
          margin-left:200px;
          margin-top:300px;
        }

        .title {
          font-size: 30px;
        }
        .toc {
          font-size: 15px;
        }
        .toc-indent {
          margin-left: 100px;
        }
        @keyframes app-logo-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(720deg);
          }
        }
      `,
    ];
  }

  // updated(changedProperties) {
  //   console.log(changedProperties)
  // }

  firstUpdated() {
    fetch('./index.json')
      .then((res) => res.json())
      .then((res) => {
        this.response = res;
        this.toc = this.response.toc
        console.log(this.response)
        for(var i = 0; i<this.toc.length;i++){
          this.toc[i].title = this.toc[i].title.replace("<b>","")
          this.toc[i].title = this.toc[i].title.replace("</b>","")
        }
        this.title = this.response.title;
      });
  }

  constructor() {
    super();
    this.response = [];
    this.title;
    this.toc = [];
    this.showContents = false;
  }

  render() {
    return html`
      <div class="app-header">
        <div class = "main">
          <div class = "title">

            ${this.response.title}
          </div >
            <div >
              <img 
              src="${`https://d1re4mvb3lawey.cloudfront.net/pg1017/cover.jpg`}"
              />
              <small>
                <b>isbn:</b> ${this.response.isbn} 
                <b>Authors:</b> ${this.response.contributors}
              </small>
            </div>
            <button @click = ${this.showTOC}> Table of Contents </button>
            <sub class = toc>
              ${this.showContents ? html ` :${this.toc.map(item => html`
                <div >${item.title}</div>
              `)}`: ''
            }
            </sub>
        </div>
      </div>
    `;
  }
  showTOC(){
    if(this.showContents){
      this.showContents = false
    }
    else {
      this.showContents = true;
    }
  }
  
}

customElements.define('my-app', MyApp);
