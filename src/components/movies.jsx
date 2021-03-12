import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesList from "./moviesList";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import _ from "lodash";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleFiltering = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleDelete = (movie) => {
    console.log(movie);
    console.log("running ");
    console.log("movies", this.state.movies);
    let movies = this.state.movies.filter((m) => m._id !== movie._id);
    console.log("movies", movies);
    this.setState({ movies });
  };
  handleLike(movie) {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  }
  handlePageChange = (page) => {
    console.log("page ", page);
    console.log("pageSize ", this.state.pageSize);
    console.log("currentPage ", this.state.currentPage);
    this.setState({ currentPage: page });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  render() {
    const {
      currentPage,
      selectedGenre,
      pageSize,
      movies: allMovies,
      sortColumn,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    // console.log("filtered ", filtered);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    if (movies.length === 0) {
      return <p>No movies in database</p>;
    }
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            genres={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onFiltering={this.handleFiltering}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} movies in database</p>
          <MoviesList
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            movies={movies}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
