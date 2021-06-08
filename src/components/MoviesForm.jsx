import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import {  deleteMovie } from "../services/movieService";
//import { getGenres } from "../services/genreService";
import { paginate, sortItems } from "../utils/paginate";
//import _ from "lodash";
import SearchBox from "./searchBox";
import { connect } from "react-redux";
import {fetchMovies  } from '../redux/slices/moviesSlice';
import {MoviesContext} from './context/MoviesContext'


class MoviesForm extends Component {
  state = {
    movies: [],
  //  genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
   
  };

  async componentDidMount() {
    // const { data } = await getGenres();
    // const genres = [{ _id: "", name: "All Genres" }, ...data];
    await this.props.fetchMovies();
    //const { data: movies } = await getMovies();
    if (this.props.hasErrors)
      window.location =  "/";
    else
      this.setState({ movies: this.props.hasErrors?[]:this.props.movieList });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    //this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
    this.setState({ searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
    //  selectedGenre,
      searchQuery,
      movies: allMovies
    } = this.state;

    const {selectedGenre:selectedGenre1} = this.props;

    let filtered = allMovies;
    
    if (selectedGenre1 && selectedGenre1._id)
       filtered = allMovies.filter(m => m.genre._id === selectedGenre1._id);
    
    if (searchQuery) 
    filtered = filtered.filter(m =>
      m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    
    const sorted = sortItems(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;
    const {handleSearch,handleLike,handleDelete,handleSort} =this;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-md-5 pt-5">
          <ListGroup />
        </div>
        <div className="col-md-7 pt-5 ">
          <div className="col ">
            <p>Showing {totalCount} movies in the database.</p>
            <MoviesContext.Provider value={{ searchQuery,handleSearch,movies }}>
              <SearchBox />
             <MoviesTable
              sortColumn={sortColumn}
              onLike={handleLike}
              onDelete={handleDelete}
              onSort={handleSort}
            />
            </MoviesContext.Provider>
          </div>

          <div className="col-md-4 ">
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
          <div className="col-md-3 ">
            {user && (
              <Link
                to="/movie/new"
                className="btn btn-primary pull-left"
                style={{ marginBottom: 20 }}
              >
                New Movie
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  selectedGenre: state.genres.selectedGenre,
  movieList:state.movies.movieList,
  hasErrors:state.movies.hasErrors,
})

export default connect(mapStateToProps,{fetchMovies})(MoviesForm)
//export default Movies;
