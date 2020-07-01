import React, { Component } from 'react';
/**
 * This is a feed card component to display a previw of the
 * feed post. It includes the following fields from the feed
 * if available.
 * 
 * - title {String}
 * - date , author (creator) {String}
 * - link to that page {String}
 * - comments url {String} : unique to some feeds
 * - categories {Array} : unique to some feeds
 * - contents {html}
 */

import { 
  Paper, Typography, Divider, Grid, Chip, Button, IconButton, Tooltip,

} from '@material-ui/core';
import SubjectIcon from '@material-ui/icons/Subject';
import LinkIcon from '@material-ui/icons/Link';

const palette = require('../configs/palette.json');
const geometry = require('../configs/geometry.json');

export default class FeedCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      style: props.style,
      title: props.item.title,
      date: props.item.date,
      author: props.item.author,
      link: props.item.link,
      comments: props.item.comments,
      categories: props.item.categories,
      content: props.item.content,
      openContent: false,
    };
  }

  /**
   * Handler to show/hide contents of the feed
   */
  handleToggleContent = () => {
    let currentState = this.state.openContent;
    this.setState({
      openContent: !currentState
    });
  }

  render() {
    const marginLeft = geometry.feedcard.margin.left;
    const marginTop = geometry.feedcard.margin.top;
    const height = geometry.feedcard.height;
    const padding = geometry.feedcard.padding;
    const style = this.state.style;
    const feedCardTextTheme = palette.text.feedcard;
    const feedCardIconTheme = palette.icons.feedcard;

    const categories = this.state.categories;
    const comments = this.state.comments;
    const content = this.state.content;
    const link = this.state.link;

    return (
      <div>
        <Paper
          elevation={20}
          variant="elevation"
          style={{
            ...style,
            left: style.left + marginLeft,
            top: style.top + marginTop,
            width: style.width - marginLeft,
            height: height - marginTop,
            backgroundColor: palette.mui.background.post,
            padding: padding
          }}
        >
          {/* Title */}
          <Typography
            variant="h6"
            align="center"
            style={{
              color: feedCardTextTheme.title,
              fontWeight: "normal",
              paddingBottom: padding*2
            }}
          >
            { this.state.title }
          </Typography>

          {/* Author, Date */}
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <Typography
                variant="body2"
                style={{
                  color: feedCardTextTheme.author
                }}
              >
                { 'By ' + this.state.author }
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                style={{
                  color: feedCardTextTheme.date
                }}
              >
                { '@ ' + this.state.date }
              </Typography>
            </Grid>
          </Grid>
          <Divider 
            style={{
              margin: padding
            }}
          />

          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
          >

            {/* Content, Link */}
            <Grid
              item
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >
              <Grid item>
                <Tooltip title="See content">
                  <IconButton>
                    <SubjectIcon 
                      style={{
                        color: feedCardIconTheme.content
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Go to source">
                  <IconButton
                    href={link}
                  >
                    <LinkIcon 
                      style={{
                        color: feedCardIconTheme.link
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>

              {/* Categories */}
              { 
                categories &&
                <Grid
                  item
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={1}
                >
                  {
                    categories.map((category) => (
                      <Grid 
                        item
                        key={category}
                      >
                        <Chip 
                          size="small"
                          label={category}
                          style={{
                            color: feedCardTextTheme.categories,
                            backgroundColor: feedCardIconTheme.categories
                          }}
                        />
                      </Grid>
                    ))
                  }
                </Grid>
              }

              {/* Comments */}
              {
                comments &&
                <Grid item>
                  <Button
                    variant="outlined"
                    href={comments}
                    style={{
                      width: "100%",
                      color: feedCardTextTheme.comments,
                      backgroundColor: feedCardIconTheme.comments
                    }}
                  >
                    See Comments
                  </Button>
                </Grid>
              }

          </Grid>
        </Paper>

        {/* Content Dialog */}

      </div>
    );
  }
}
