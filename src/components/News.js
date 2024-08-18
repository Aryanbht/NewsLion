import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Newsitem from './Newsitem';
import Spinner from './Spinner';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0, // Initialize totalResults in the state
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a2e929180a2843e7b73d5ce287cb34fa&page=1&pageSize=${this.props.pageSize}`;
    const data = await fetch(URL);
    const parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  handlePrevClick = async () => {
    console.log('Previous');
    this.setState({ loading: true });
    const URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a2e929180a2843e7b73d5ce287cb34fa&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    const data = await fetch(URL);
    const parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  handleNextClick = async () => {
    console.log('Next');
    const { totalResults } = this.state;
    const totalPages = Math.ceil(totalResults / this.props.pageSize);

    if (this.state.page + 1 > totalPages) {
      return; // Exiting early if next page exceeds total pages
    }
    const URL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.country}&apiKey=a2e929180a2843e7b73d5ce287cb34fa&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    const data = await fetch(URL);
    const parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  render() {
    return (
      <div className="container my-4">
        <h1 className="text-center">NewsLion - Top Headlines</h1>
        {this.state.loading && <Spinner />}

        <div className="row mt-5 mx-3">
          {!this.state.loading && this.state.articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <Newsitem
                title={element.title ? element.title : 'No Title'}
                description={element.description ? element.description : 'No Description'}
                imageUrl={element.urlToImage}
                newsurl={element.url}
              />
            </div>
          ))}
        </div>
        <div className="container my-5 d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default News;
