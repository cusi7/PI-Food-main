import React from 'react';
import { Link } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import NavBar from './Components/Navbar/Navbar';

//Testeo el componente Nav

configure({adapter: new Adapter()});

describe('NavBar', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<NavBar />)
  })

  it('Tiene que renderizar dos Links', () => {
    expect(wrapper.find(Link)).toHaveLength(2);
  });
  it('Un Link debe incluir la palabra "Home" y cambiar la ruta hacia "/Recipe_Book".', () => {  
    expect(wrapper.find(Link).at(0).prop('to')).toEqual('/Recipe_Book');
    expect(wrapper.find(Link).at(0).text()).toEqual('Home');
  });

  it('Otro Link debe incluir la palabra "Crea tu receta" y cambiar la ruta hacia "/Recipe_Book/create"', () => {
    expect(wrapper.find(Link).at(1).prop('to')).toEqual('/Recipe_Book/create');
    expect(wrapper.find(Link).at(1).text()).toEqual('Crea tu receta');
  });
})




