import chai from 'chai';
import React from 'react';
import { shallow  } from 'enzyme';
import { Link } from 'react-router';
import MovieList from '../../movie-management/components/movie-list.jsx';

chai.should();

describe('The MovieList component', () => {
    let component;

    beforeEach(() =>{
        component = shallow(<MovieList.WrappedComponent movies={[
            {id:1,title:'Movie 1',abridgedDirectors:[]},
            {id:2,title:'Movie 2',abridgedDirectors:[]},
            {id:3,title:'Movie 3',abridgedDirectors:[]},
        ]} />);
    });


    it('should render 3 links for data', () => {
        component.find(Link).length.should.equal(3)
    });

    it('should render 4 rows for data and header', () => {
        component.find('tr').length.should.equal(4)
    });
});
