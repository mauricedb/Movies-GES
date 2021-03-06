webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(39);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(169);

	var _reactRedux = __webpack_require__(230);

	var _components = __webpack_require__(250);

	var _actions = __webpack_require__(254);

	var _notifications = __webpack_require__(528);

	var _store = __webpack_require__(529);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var store = (0, _store.createMovieStore)();
	store.dispatch((0, _actions.loadMovies)());

	(0, _notifications.subscribe)(store.dispatch);

	function onEnterDetails(nextState) {
	  store.dispatch((0, _actions.loadMovie)(nextState.params.id));
	}

	_reactDom2.default.render(_react2.default.createElement(
	  _reactRedux.Provider,
	  {
	    store: store
	  },
	  _react2.default.createElement(
	    _reactRouter.Router,
	    {
	      history: _reactRouter.hashHistory
	    },
	    _react2.default.createElement(
	      _reactRouter.Route,
	      {
	        path: '/',
	        component: _components.App
	      },
	      _react2.default.createElement(_reactRouter.IndexRoute, {
	        component: _components.MovieList
	      }),
	      _react2.default.createElement(_reactRouter.Route, {
	        path: 'list',
	        component: _components.MovieList
	      }),
	      _react2.default.createElement(_reactRouter.Route, {
	        path: 'details/:id',
	        component: _components.MovieDetails,
	        onEnter: onEnterDetails
	      })
	    )
	  )
	), document.getElementById('app'));

/***/ },

/***/ 250:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MovieDetails = exports.MovieList = exports.App = undefined;

	var _app = __webpack_require__(251);

	var _app2 = _interopRequireDefault(_app);

	var _movieList = __webpack_require__(252);

	var _movieList2 = _interopRequireDefault(_movieList);

	var _movieDetails = __webpack_require__(253);

	var _movieDetails2 = _interopRequireDefault(_movieDetails);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.App = _app2.default;
	exports.MovieList = _movieList2.default;
	exports.MovieDetails = _movieDetails2.default;

/***/ },

/***/ 251:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var App = function App(props) {
	  var children = props.children;


	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      'h2',
	      null,
	      'Movie Management using React'
	    ),
	    children
	  );
	};

	App.propTypes = {
	  children: _react.PropTypes.object.isRequired
	};

	exports.default = App;

/***/ },

/***/ 252:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(169);

	var _reactRedux = __webpack_require__(230);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MovieList = function MovieList(_ref) {
	  var movies = _ref.movies;

	  var rows = movies.map(function (movie) {
	    return _react2.default.createElement(
	      'tr',
	      { key: movie.id },
	      _react2.default.createElement(
	        'td',
	        null,
	        movie.title
	      ),
	      _react2.default.createElement(
	        'td',
	        null,
	        movie.abridgedDirectors.join(', ')
	      ),
	      _react2.default.createElement(
	        'td',
	        { style: { width: 1 } },
	        _react2.default.createElement(
	          _reactRouter.Link,
	          {
	            to: 'details/' + movie.id,
	            className: 'btn btn-default'
	          },
	          'Details'
	        )
	      )
	    );
	  });
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      'p',
	      null,
	      _react2.default.createElement(
	        'button',
	        { className: 'btn btn-toolbar' },
	        'Add movie'
	      )
	    ),
	    _react2.default.createElement(
	      'table',
	      { className: 'table table-bordered table-striped table-condensed' },
	      _react2.default.createElement(
	        'thead',
	        null,
	        _react2.default.createElement(
	          'tr',
	          null,
	          _react2.default.createElement(
	            'th',
	            null,
	            'Title'
	          ),
	          _react2.default.createElement(
	            'th',
	            null,
	            'Directed by'
	          ),
	          _react2.default.createElement('th', null)
	        )
	      ),
	      _react2.default.createElement(
	        'tbody',
	        null,
	        rows
	      )
	    )
	  );
	};

	MovieList.propTypes = {
	  movies: _react.PropTypes.array.isRequired
	};

	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    movies: state.movies
	  };
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(MovieList);

/***/ },

/***/ 253:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(230);

	var _actions = __webpack_require__(254);

	var _commands = __webpack_require__(257);

	var _movieTitle = __webpack_require__(261);

	var _movieTitle2 = _interopRequireDefault(_movieTitle);

	var _movieDescription = __webpack_require__(262);

	var _movieDescription2 = _interopRequireDefault(_movieDescription);

	var _movieDirectors = __webpack_require__(263);

	var _movieDirectors2 = _interopRequireDefault(_movieDirectors);

	var _editScore = __webpack_require__(527);

	var _editScore2 = _interopRequireDefault(_editScore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MovieDetails = function MovieDetails(props) {
	  var movie = props.movie;


	  if (movie.status !== 'LOADED') {
	    return _react2.default.createElement('div', null);
	  }

	  var description = {
	    synopsis: movie.synopsis,
	    criticsConsensus: movie.criticsConsensus,
	    year: movie.year || 0,
	    mpaaRating: movie.mpaaRating
	  };

	  return _react2.default.createElement(
	    'form',
	    null,
	    _react2.default.createElement(_movieTitle2.default, {
	      title: movie.title,
	      id: movie.id,
	      titleMovie: props.titleMovie
	    }),
	    _react2.default.createElement(_movieDescription2.default, {
	      id: movie.id,
	      description: description,
	      updateDescription: props.updateDescription
	    }),
	    _react2.default.createElement(_movieDirectors2.default, {
	      abridgedDirectors: movie.abridgedDirectors,
	      id: movie.id,
	      addDirectorToMovie: props.addDirectorToMovie
	    }),
	    _react2.default.createElement(_editScore2.default, {
	      label: 'Critics Score:',
	      id: movie.id,
	      score: movie.criticsScore,
	      updateScore: props.rateMovieByCrictics
	    }),
	    _react2.default.createElement(_editScore2.default, {
	      label: 'Audience Score:',
	      id: movie.id,
	      score: movie.audienceScore,
	      updateScore: props.rateMovieByAudience
	    })
	  );
	};

	MovieDetails.propTypes = {
	  movie: _react.PropTypes.object.isRequired,
	  movieId: _react.PropTypes.string.isRequired,
	  titleMovie: _react.PropTypes.func.isRequired,
	  updateDescription: _react.PropTypes.func.isRequired,
	  addDirectorToMovie: _react.PropTypes.func.isRequired,
	  rateMovieByCrictics: _react.PropTypes.func.isRequired,
	  rateMovieByAudience: _react.PropTypes.func.isRequired
	};

	function mapStateToProps(state, ownProps) {
	  return {
	    movie: state.movie,
	    movieId: ownProps.params.id
	  };
	}

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    titleMovie: function titleMovie(id, title) {
	      return (0, _commands.titleMovie)(id, title).then(dispatch((0, _actions.movieTitled)(id, title)));
	    },
	    updateDescription: function updateDescription(id, description) {
	      return (0, _commands.describeMovie)(id, description).then(dispatch((0, _actions.movieDescribed)(id, description)));
	    },
	    addDirectorToMovie: function addDirectorToMovie(id, director) {
	      return (0, _commands.addDirectorToMovie)(id, director).then(dispatch((0, _actions.directorAddedToMovie)(id, director)));
	    },
	    rateMovieByCrictics: function rateMovieByCrictics(id, score) {
	      return (0, _commands.rateMovieByCrictics)(id, score).then(dispatch((0, _actions.movieRatedByCritics)(id, score)));
	    },
	    rateMovieByAudience: function rateMovieByAudience(id, score) {
	      return (0, _commands.rateMovieByAudience)(id, score).then(dispatch((0, _actions.movieRatedByAudience)(id, score)));
	    }
	  };
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MovieDetails);

/***/ },

/***/ 254:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.movieRatedByAudience = exports.movieRatedByCritics = exports.directorAddedToMovie = exports.movieDescribed = exports.movieTitled = exports.loadMovie = exports.loadMovies = undefined;

	var _jquery = __webpack_require__(255);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _constants = __webpack_require__(256);

	var constants = _interopRequireWildcard(_constants);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var moviesLoaded = function moviesLoaded(movies) {
	  return {
	    type: constants.moviesLoaded,
	    payload: movies
	  };
	};

	var loadMovies = exports.loadMovies = function loadMovies() {
	  return function (dispatch) {
	    _jquery2.default.getJSON('/api/movies').then(function (movies) {
	      return dispatch(moviesLoaded(movies));
	    });
	  };
	};

	var movieLoaded = function movieLoaded(movie) {
	  return {
	    type: constants.movieLoaded,
	    payload: movie
	  };
	};

	var loadMovie = exports.loadMovie = function loadMovie(id) {
	  return function (dispatch) {
	    _jquery2.default.getJSON('/api/movies/' + id).then(function (movie) {
	      return dispatch(movieLoaded(movie));
	    });
	  };
	};

	var movieTitled = exports.movieTitled = function movieTitled(id, title) {
	  return {
	    type: constants.movieTitled,
	    payload: {
	      id: id,
	      title: title
	    }
	  };
	};

	var movieDescribed = exports.movieDescribed = function movieDescribed(id, description) {
	  return {
	    type: constants.movieDescribed,
	    payload: {
	      id: id,
	      description: description
	    }
	  };
	};

	var directorAddedToMovie = exports.directorAddedToMovie = function directorAddedToMovie(id, director) {
	  return {
	    type: constants.directorAddedToMovie,
	    payload: {
	      id: id,
	      director: director
	    }
	  };
	};

	var movieRatedByCritics = exports.movieRatedByCritics = function movieRatedByCritics(id, criticsScore) {
	  return {
	    type: constants.movieRatedByCritics,
	    payload: {
	      id: id,
	      criticsScore: criticsScore
	    }
	  };
	};

	var movieRatedByAudience = exports.movieRatedByAudience = function movieRatedByAudience(id, audienceScore) {
	  return {
	    type: constants.movieRatedByAudience,
	    payload: {
	      id: id,
	      audienceScore: audienceScore
	    }
	  };
	};

/***/ },

/***/ 256:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var moviesLoaded = exports.moviesLoaded = 'MOVIES-LOADED';
	var movieLoaded = exports.movieLoaded = 'MOVIE-LOADED';
	var movieTitled = exports.movieTitled = 'MOVIE-TITLED';
	var movieDescribed = exports.movieDescribed = 'MOVIE-DESCRIBED';
	var directorAddedToMovie = exports.directorAddedToMovie = 'DIRECTOR-ADDED-TO-MOVIE';
	var movieRatedByCritics = exports.movieRatedByCritics = 'MOVIE-RATED-BY-CRITICS';
	var movieRatedByAudience = exports.movieRatedByAudience = 'MOVIE-RATED-BY-AUDIENCE';

/***/ },

/***/ 257:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.rateMovieByAudience = exports.rateMovieByCrictics = exports.addDirectorToMovie = exports.describeMovie = exports.titleMovie = undefined;

	var _uuid = __webpack_require__(258);

	var _uuid2 = _interopRequireDefault(_uuid);

	var _cedar = __webpack_require__(260);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var titleMovie = exports.titleMovie = function titleMovie(movieId, title) {
	  var command = {
	    commandName: 'TitleMovie',
	    commandId: _uuid2.default.v4(),
	    movieId: movieId,
	    title: title
	  };

	  return (0, _cedar.execute)(command);
	};

	var describeMovie = exports.describeMovie = function describeMovie(movieId, description) {
	  var command = {
	    commandName: 'DescribeMovie',
	    commandId: _uuid2.default.v4(),
	    movieId: movieId,
	    synopsis: description.synopsis,
	    criticsConsensus: description.criticsConsensus,
	    mpaaRating: description.mpaaRating,
	    year: description.year || 0
	  };

	  return (0, _cedar.execute)(command);
	};

	var addDirectorToMovie = exports.addDirectorToMovie = function addDirectorToMovie(movieId, director) {
	  var command = {
	    commandName: 'AddDirectorToMovie',
	    commandId: _uuid2.default.v4(),
	    movieId: movieId,
	    director: director
	  };

	  return (0, _cedar.execute)(command);
	};

	var rateMovieByCrictics = exports.rateMovieByCrictics = function rateMovieByCrictics(movieId, rating) {
	  var command = {
	    commandName: 'RateMovieByCrictics',
	    commandId: _uuid2.default.v4(),
	    movieId: movieId,
	    rating: rating
	  };

	  return (0, _cedar.execute)(command);
	};

	var rateMovieByAudience = exports.rateMovieByAudience = function rateMovieByAudience(movieId, rating) {
	  var command = {
	    commandName: 'RateMovieByAudience',
	    commandId: _uuid2.default.v4(),
	    movieId: movieId,
	    rating: rating
	  };

	  return (0, _cedar.execute)(command);
	};

/***/ },

/***/ 260:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.execute = undefined;

	var _jquery = __webpack_require__(255);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var execute = exports.execute = function execute(command) {
	  var deferred = new _jquery2.default.Deferred();

	  _jquery2.default.ajax({
	    url: '/api/commands/' + command.commandId,
	    type: 'PUT',
	    contentType: 'application/vnd.movies_ges.domain.commands.' + (command.commandName.toLowerCase() + '+json'),
	    accepts: 'application/problem+json',
	    data: JSON.stringify(command),
	    error: function error(data) {
	      deferred.reject(data);
	    },
	    success: function success(data) {
	      deferred.resolve(data);
	    }
	  });

	  return deferred.promise();
	};

/***/ },

/***/ 261:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MovieTitle = function (_Component) {
	  _inherits(MovieTitle, _Component);

	  function MovieTitle() {
	    _classCallCheck(this, MovieTitle);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MovieTitle).call(this));

	    _this.state = {
	      title: '',
	      editMode: false
	    };

	    _this.toEditMode = function () {
	      _this.setState({
	        editMode: true
	      });
	    };

	    _this.cancelEdit = function () {
	      _this.setState({
	        editMode: false,
	        title: _this.props.title
	      });
	    };

	    _this.titleMovie = function (e) {
	      e.preventDefault();

	      _this.props.titleMovie(_this.props.id, _this.state.title).then(function () {
	        _this.setState({
	          editMode: false
	        });
	      });
	    };

	    _this.titleChanged = function (e) {
	      _this.setState({
	        title: e.target.value
	      });
	    };
	    return _this;
	  }

	  _createClass(MovieTitle, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.setState({
	        title: this.props.title
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(newProps) {
	      this.setState({
	        title: newProps.title
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var buttons = void 0;
	      var _state = this.state;
	      var editMode = _state.editMode;
	      var title = _state.title;


	      if (editMode) {
	        buttons = _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'button',
	            {
	              className: 'btn btn-xs btn-default pull-right',
	              onClick: this.cancelEdit
	            },
	            'Cancel'
	          ),
	          _react2.default.createElement(
	            'button',
	            {
	              className: 'btn btn-xs btn-default pull-right',
	              onClick: this.titleMovie
	            },
	            'Save'
	          )
	        );
	      } else {
	        buttons = _react2.default.createElement(
	          'button',
	          {
	            className: 'btn btn-xs btn-default btn-edit pull-right',
	            onClick: this.toEditMode
	          },
	          'Edit'
	        );
	      }

	      return _react2.default.createElement(
	        'div',
	        null,
	        buttons,
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            {
	              htmlFor: 'title'
	            },
	            'Title'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text',
	            className: 'form-control',
	            disabled: !editMode,
	            onChange: this.titleChanged,
	            value: title
	          })
	        )
	      );
	    }
	  }]);

	  return MovieTitle;
	}(_react.Component);

	exports.default = MovieTitle;


	MovieTitle.propTypes = {
	  id: _react.PropTypes.string.isRequired,
	  title: _react.PropTypes.string.isRequired,
	  titleMovie: _react.PropTypes.func.isRequired
	};

/***/ },

/***/ 262:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MovieDescription = function (_Component) {
	  _inherits(MovieDescription, _Component);

	  function MovieDescription() {
	    _classCallCheck(this, MovieDescription);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MovieDescription).call(this));

	    _this.state = {
	      description: {
	        synopsis: '',
	        criticsConsensus: '',
	        year: 0,
	        mpaaRating: ''
	      },
	      editMode: false
	    };

	    _this.toEditMode = function () {
	      _this.setState({
	        editMode: true
	      });
	    };

	    _this.cancelEdit = function () {
	      _this.setState({
	        editMode: false,
	        description: _this.props.description
	      });
	    };

	    _this.updateDescription = function (e) {
	      e.preventDefault();

	      _this.props.updateDescription(_this.props.id, _this.state.description).then(function () {
	        _this.setState({
	          editMode: false
	        });
	      });
	    };

	    _this.synopsisChanged = function (e) {
	      var description = _extends({}, _this.state.description, {
	        synopsis: e.target.value
	      });

	      _this.setState({
	        description: description
	      });
	    };

	    _this.criticsConsensusChanged = function (e) {
	      var description = _extends({}, _this.state.description, {
	        criticsConsensus: e.target.value
	      });

	      _this.setState({
	        description: description
	      });
	    };

	    _this.yearChanged = function (e) {
	      var description = _extends({}, _this.state.description, {
	        year: +e.target.value
	      });

	      _this.setState({
	        description: description
	      });
	    };

	    _this.mpaaRatingChanged = function (e) {
	      var description = _extends({}, _this.state.description, {
	        mpaaRating: e.target.value
	      });

	      _this.setState({
	        description: description
	      });
	    };
	    return _this;
	  }

	  _createClass(MovieDescription, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.setState({
	        description: this.props.description
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(newProps) {
	      this.setState({
	        description: newProps.description
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var buttons = void 0;
	      var _state = this.state;
	      var editMode = _state.editMode;
	      var description = _state.description;
	      var synopsis = description.synopsis;
	      var criticsConsensus = description.criticsConsensus;
	      var year = description.year;
	      var mpaaRating = description.mpaaRating;


	      if (editMode) {
	        buttons = _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'button',
	            {
	              className: 'btn btn-xs btn-default pull-right',
	              onClick: this.cancelEdit
	            },
	            'Cancel'
	          ),
	          _react2.default.createElement(
	            'button',
	            {
	              className: 'btn btn-xs btn-default pull-right',
	              onClick: this.updateDescription
	            },
	            'Save'
	          )
	        );
	      } else {
	        buttons = _react2.default.createElement(
	          'button',
	          {
	            className: 'btn btn-xs btn-default btn-edit pull-right',
	            onClick: this.toEditMode
	          },
	          'Edit'
	        );
	      }

	      return _react2.default.createElement(
	        'div',
	        null,
	        buttons,
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Synopsis'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text',
	            className: 'form-control',
	            disabled: !editMode,
	            onChange: this.synopsisChanged,
	            value: synopsis || ''
	          })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Critics Consensus'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text',
	            className: 'form-control',
	            disabled: !editMode,
	            onChange: this.criticsConsensusChanged,
	            value: criticsConsensus || ''
	          })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Year'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text',
	            className: 'form-control',
	            disabled: !editMode,
	            onChange: this.yearChanged,
	            value: year || 0
	          })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'MPAA Rating'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text',
	            className: 'form-control',
	            disabled: !editMode,
	            onChange: this.mpaaRatingChanged,
	            value: mpaaRating || ''
	          })
	        )
	      );
	    }
	  }]);

	  return MovieDescription;
	}(_react.Component);

	exports.default = MovieDescription;


	MovieDescription.propTypes = {
	  id: _react.PropTypes.string.isRequired,
	  description: _react.PropTypes.object.isRequired,
	  updateDescription: _react.PropTypes.func.isRequired
	};

	//    <div ng-controller="movie-description-controller">
	//
	//
	//
	//
	//    </div>

/***/ },

/***/ 263:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(264);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MovieDirectors = function (_Component) {
	  _inherits(MovieDirectors, _Component);

	  function MovieDirectors() {
	    _classCallCheck(this, MovieDirectors);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MovieDirectors).call(this));

	    _this.state = {
	      director: '',
	      editMode: false
	    };

	    _this.toEditMode = function () {
	      _this.setState({
	        editMode: true
	      });
	    };

	    _this.directorChanged = function (e) {
	      _this.setState({
	        director: e.target.value
	      });
	    };

	    _this.cancelEdit = function () {
	      _this.setState({
	        director: '',
	        editMode: false
	      });
	    };

	    _this.addDirectorToMovie = function () {
	      _this.props.addDirectorToMovie(_this.props.id, _this.state.director).then(function () {
	        _this.setState({
	          editMode: false
	        });
	      });
	    };
	    return _this;
	  }

	  _createClass(MovieDirectors, [{
	    key: 'render',
	    value: function render() {
	      var abridgedDirectors = this.props.abridgedDirectors.map(function (director, i) {
	        return _react2.default.createElement(
	          'li',
	          {
	            key: director + i
	          },
	          director
	        );
	      });

	      return _react2.default.createElement(
	        'div',
	        { className: 'form-group' },
	        _react2.default.createElement(
	          'label',
	          null,
	          'Directors'
	        ),
	        ' ',
	        _react2.default.createElement(
	          'button',
	          {
	            className: 'btn btn-default',
	            onClick: this.toEditMode
	          },
	          'Add'
	        ),
	        _react2.default.createElement(
	          'ul',
	          null,
	          abridgedDirectors
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.Modal,
	          { show: this.state.editMode, onHide: this.cancelEdit },
	          _react2.default.createElement(
	            _reactBootstrap.Modal.Header,
	            { closeButton: true },
	            _react2.default.createElement(
	              _reactBootstrap.Modal.Title,
	              null,
	              'Add Director'
	            )
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Modal.Body,
	            null,
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement(
	                'label',
	                null,
	                'Director'
	              ),
	              _react2.default.createElement('input', {
	                type: 'text',
	                className: 'form-control',
	                id: 'movieTitle',
	                name: 'movieTitle',
	                'ng-model': 'ctrl.director',
	                onChange: this.directorChanged,
	                value: this.state.director
	              })
	            )
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Modal.Footer,
	            null,
	            _react2.default.createElement(
	              'button',
	              {
	                className: 'btn btn-primary',
	                onClick: this.addDirectorToMovie
	              },
	              'OK'
	            ),
	            _react2.default.createElement(
	              'button',
	              {
	                className: 'btn btn-warning',
	                onClick: this.cancelEdit
	              },
	              'Cancel'
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return MovieDirectors;
	}(_react.Component);

	exports.default = MovieDirectors;


	MovieDirectors.propTypes = {
	  id: _react.PropTypes.string.isRequired,
	  abridgedDirectors: _react.PropTypes.array.isRequired,
	  addDirectorToMovie: _react.PropTypes.func.isRequired
	};

/***/ },

/***/ 527:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactBootstrap = __webpack_require__(264);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var EditScore = function (_Component) {
	  _inherits(EditScore, _Component);

	  function EditScore() {
	    _classCallCheck(this, EditScore);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EditScore).call(this));

	    _this.state = {
	      score: 0,
	      editMode: false
	    };

	    _this.scoreChanged = function (e) {
	      _this.setState({
	        score: +e.target.value
	      });
	    };

	    _this.toEditMode = function (e) {
	      e.preventDefault();

	      _this.setState({
	        editMode: true
	      });
	    };

	    _this.cancelEdit = function () {
	      _this.setState({
	        score: _this.props.score,
	        editMode: false
	      });
	    };

	    _this.updateScore = function () {
	      _this.props.updateScore(_this.props.id, _this.state.score).then(function () {
	        _this.setState({
	          editMode: false
	        });
	      });
	    };
	    return _this;
	  }

	  _createClass(EditScore, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.setState({
	        score: this.props.score
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(newProps) {
	      this.setState({
	        score: newProps.score
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: 'form-group' },
	        _react2.default.createElement(
	          'label',
	          { htmlFor: 'criticsScore' },
	          this.props.label
	        ),
	        ' ',
	        this.props.score,
	        ' ',
	        _react2.default.createElement(
	          'button',
	          {
	            className: 'btn btn-xs',
	            onClick: this.toEditMode
	          },
	          'Score'
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.Modal,
	          { show: this.state.editMode, onHide: this.cancelEdit },
	          _react2.default.createElement(
	            _reactBootstrap.Modal.Header,
	            { closeButton: true },
	            _react2.default.createElement(
	              _reactBootstrap.Modal.Title,
	              null,
	              'Rate Movie'
	            )
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Modal.Body,
	            null,
	            _react2.default.createElement(
	              'div',
	              { className: 'form-group' },
	              _react2.default.createElement(
	                'label',
	                null,
	                'Rating'
	              ),
	              _react2.default.createElement('input', {
	                type: 'range',
	                className: 'form-control',
	                onChange: this.scoreChanged,
	                value: this.state.score,
	                min: '0',
	                max: '100'
	              }),
	              'Rating: ',
	              this.state.score,
	              ' out of 100'
	            )
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Modal.Footer,
	            null,
	            _react2.default.createElement(
	              'button',
	              {
	                className: 'btn btn-primary',
	                onClick: this.updateScore
	              },
	              'OK'
	            ),
	            _react2.default.createElement(
	              'button',
	              {
	                className: 'btn btn-warning',
	                onClick: this.cancelEdit
	              },
	              'Cancel'
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return EditScore;
	}(_react.Component);

	exports.default = EditScore;


	EditScore.propTypes = {
	  label: _react.PropTypes.string.isRequired,
	  id: _react.PropTypes.string.isRequired,
	  score: _react.PropTypes.number.isRequired,
	  updateScore: _react.PropTypes.func.isRequired
	};

/***/ },

/***/ 528:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.subscribe = undefined;

	var _jquery = __webpack_require__(255);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _actions = __webpack_require__(254);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var subscribe = exports.subscribe = function subscribe(dispatch) {
	  var moviesHub = _jquery2.default.connection.moviesHub;
	  moviesHub.client.movieTitled = function (e) {
	    dispatch((0, _actions.movieTitled)(e.MovieId, e.Title));
	  };
	  _jquery2.default.connection.hub.start();
	};

/***/ },

/***/ 529:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createMovieStore = undefined;

	var _redux = __webpack_require__(237);

	var _reduxThunk = __webpack_require__(530);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reducers = __webpack_require__(531);

	var reducers = _interopRequireWildcard(_reducers);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createMovieStore = exports.createMovieStore = function createMovieStore() {
	  return (0, _redux.createStore)((0, _redux.combineReducers)(reducers), (0, _redux.applyMiddleware)(_reduxThunk2.default));
	};

/***/ },

/***/ 531:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.movie = exports.movies = undefined;

	var _movies2 = __webpack_require__(532);

	var _movies3 = _interopRequireDefault(_movies2);

	var _movie2 = __webpack_require__(533);

	var _movie3 = _interopRequireDefault(_movie2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.movies = _movies3.default;
	exports.movie = _movie3.default;

/***/ },

/***/ 532:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _constants = __webpack_require__(256);

	var constants = _interopRequireWildcard(_constants);

	var _movie = __webpack_require__(533);

	var _movie2 = _interopRequireDefault(_movie);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var movies = function movies() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case constants.moviesLoaded:
	      return action.payload;
	    case constants.movieTitled:
	      return state.map(function (m) {
	        return (0, _movie2.default)(m, action);
	      });
	    case constants.movieDescribed:
	      return state.map(function (m) {
	        return (0, _movie2.default)(m, action);
	      });
	    default:
	      return state;
	  }
	};

	exports.default = movies;

/***/ },

/***/ 533:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _constants = __webpack_require__(256);

	var constants = _interopRequireWildcard(_constants);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var movie = function movie() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? { status: '' } : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case constants.movieLoaded:
	      return _extends({}, action.payload, {
	        status: 'LOADED'
	      });

	    case constants.movieTitled:
	      if (state.id === action.payload.id) {
	        return _extends({}, state, {
	          title: action.payload.title
	        });
	      }

	      return state;

	    case constants.movieDescribed:
	      if (state.id === action.payload.id) {
	        return _extends({}, state, action.payload.description);
	      }

	      return state;

	    case constants.directorAddedToMovie:
	      if (state.id === action.payload.id) {
	        return _extends({}, state, {
	          abridgedDirectors: [].concat(_toConsumableArray(state.abridgedDirectors), [action.payload.director])
	        });
	      }

	      return state;

	    case constants.movieRatedByCritics:
	      if (state.id === action.payload.id) {
	        var criticsScore = Math.round(0.9 * state.criticsScore + 0.1 * action.payload.criticsScore);

	        return _extends({}, state, {
	          criticsScore: criticsScore
	        });
	      }

	      return state;

	    case constants.movieRatedByAudience:
	      if (state.id === action.payload.id) {
	        var audienceScore = Math.round(0.9 * state.audienceScore + 0.1 * action.payload.audienceScore);

	        return _extends({}, state, {
	          audienceScore: audienceScore
	        });
	      }

	      return state;

	    default:
	      return state;
	  }
	};

	exports.default = movie;

/***/ }

});