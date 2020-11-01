/** @jsx ReactMini.createElement */
import * as ReactMini from './react-mini';
const randomLikes = () => Math.ceil(Math.random() * 100);

const stories = [
  {
    name: "Didact introduction",
    url: "http://bit.ly/2pX7HNn",
    likes: randomLikes()
  },
  {
    name: "Rendering DOM elements ",
    url: "http://bit.ly/2qCOejH",
    likes: randomLikes()
  },
  {
    name: "Element creation and JSX",
    url: "http://bit.ly/2qGbw8S",
    likes: randomLikes()
  },
  {
    name: "Instances and reconciliation",
    url: "http://bit.ly/2q4A746",
    likes: randomLikes()
  },
  {
    name: "Components and state",
    url: "http://bit.ly/2rE16nh",
    likes: randomLikes()
  }
];

class App extends ReactMini.Component {
  render() {
    return (
      <div>
        <h1>Didact Stories</h1>
        <ul>
          {this.props.stories.map(story => {
            return <Story name={story.name} url={story.url} />;
          })}
        </ul>
      </div>
    );
  }
}
class Story extends ReactMini.Component {
  constructor(props) {
    super(props);
    this.state = { likes: Math.ceil(Math.random() * 100) };
  }
  like() {
    this.setState({
      likes: this.state.likes + 1
    });
  }
  render() {
    const { name, url } = this.props;
    const { likes } = this.state;
    const likesElement = <span />;
    return (
      <li>
        <button onClick={e => this.like()}>{likes}<b>❤️</b></button>
        <a href={url}>{name}</a>
      </li>
    );
  }
}

ReactMini.render(<App  stories={stories}/>, document.getElementById('root'))
