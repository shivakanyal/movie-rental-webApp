import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
  };
  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  handleFiltering = (genre) => {
    // console.log(genre);
    // const genres = getGenres();
    // const index = genres.indexOf(genre);
    // genres.forEach((genre) => {
    //   genre.active = false;
    // });
    // genres[index].active = true;
    // let movies = getMovies().filter((movie) => movie.genre.name === genre.name);
    // this.setState({ movies, genres });
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleDelete(id) {
    let movies = this.state.movies.filter((movie) => movie._id !== id);
    this.setState({ movies });
  }
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
  render() {
    const {
      currentPage,
      selectedGenre,
      pageSize,
      movies: allMovies,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);

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

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Stock</th>
                <th scope="col">Rate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie, _id) => (
                <tr>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      key={_id}
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        this.handleDelete(movie._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
