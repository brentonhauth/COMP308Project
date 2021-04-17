import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';


const YT_RE = /^(https?:\/\/)?(www\.)?youtu(\.be\/|be\.com\/watch\?v=)[\-\w]{11}/;
const YT_ID_RE = /[\w\-]{11}$/;

/**
 * @param {string} link
 */
function getYouTubeId(link) {
  try {
    const [clean] = link.match(YT_RE);
    const [id] = clean.match(YT_ID_RE);
    return id;
  } catch (err) {
    console.error('Invalid Video hypelink!', err);
    return false;
  }
}


const DEFAULT_WIDTH = 560;
const DEFAULT_HEIGHT = 315;

export default class YouTubeVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  render() {
    let { hyperlink, width, height } = this.props;
    const { show } = this.state;
    const videoId = hyperlink && getYouTubeId(hyperlink);
    if (!videoId) {
      return null;
    }

    width = width || DEFAULT_WIDTH;
    height = height || DEFAULT_HEIGHT;

    return (
      <Row>
        <Col>
          {show &&
          <iframe
            width={width}
            height={height}
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>}
            <br></br>
          <Button variant="success" style={{width}} onClick={() => this.setState({ show: !show })}>{show ? 'Hide' : 'Watch'} Video</Button>
        </Col>
      </Row>
    );
  }
}
