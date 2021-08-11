import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
//import MoviesTable from "./moviesTable";
import Table from './common/table';
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import {  deleteMovie } from "../services/movieService";
//import { getGenres } from "../services/genreService";
import { paginate, sortItems } from "../utils/paginate";
import Like from "./common/like";
//import _ from "lodash";
import SearchBox from "./searchBox";
import { connect } from "react-redux";
import {fetchMovies  } from '../redux/slices/moviesSlice';
import {MoviesContext} from './context/Context'


class MoviesForm extends Component {
  state = {
    movies: [],
  //  genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", sortorder: "asc" },
    columns : [
      {
        path: "title",
        label: "Title",
        sortorder:"",
        content: movie => <Link to={`/movie/${movie._id}`}>{movie.title}</Link>
      },
      { path: "genre.name", label: "Genre" },
      { path: "numberInStock", label: "Stock" },
      { path: "dailyRentalRate", label: "Rate" },
      {
        key: "like",
        content: movie => (
          <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
        )
      }
    ]
  };

 

  deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        onClick={() => this.handleDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
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

  // handleGenreSelect = genre => {
  //   //this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  //   this.setState({ searchQuery: "", currentPage: 1 });
  // };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = sortColumn => {
    const columns = [ ...this.state.columns ];
    const index =columns.findIndex((item) => item.path === sortColumn.path);
     columns[index].sortorder =sortColumn.sortorder;
    // setColumns[columns];
    // const sorted = sortItems(services, [sortColumn.path], [sortColumn.sortorder]);
    // setServices(sorted); 
      
    this.setState({ columns,sortColumn });
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
    
    const sorted = sortItems(filtered, [sortColumn.path], [sortColumn.sortorder]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, searchQuery,columns } = this.state;
    const { user } = this.props;
    const {handleSearch,handleSort} =this;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row justify-content-center ltr">
        <div className="col-lg-4 pt-5">
          <ListGroup />
        </div>
        <div className="col-lg-6 pt-5 ">
          <div >
            <p>Showing {totalCount} movies in the database.</p>
            <MoviesContext.Provider value={{ searchQuery,handleSearch }}>
              <SearchBox />
             <Table
             // sortColumn={sortColumn}
              columns={columns}
              onSort={handleSort}
              data={movies}
            />
            </MoviesContext.Provider>
          </div>

          <div className="pull-right">
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
          <div className="pull-left">
            {user && (
              <Link
                to="/movie/new"
                className="btn btn-primary "
                
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
