import React, { Component } from 'react';
import { View, ScrollView, Text, StatusBar, Dimensions, TouchableHighlight } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import SavedItem from './SavedItem';
import favorites from '../lib/favorites';
import userService from '../lib/userService';

const { height } = Dimensions.get('window');

class SavedList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      sortFunction: this.distance
    };
    this.recentOrPendingRequest = false;
    this.hasChildInViewStack = false;
  }

  componentWillMount() {
    //favorites.add(1, 2);
    this.getFavoriteSpots();
    this.recentOrPendingRequest = true;
  }

  getFavoriteSpots() {
    favorites.get(userService.currentUser.id)
      .then(favoritesArray => {
        this.setState({ 
          favorites: favoritesArray.sort(this.state.sortFunction)
        });
        setTimeout(() => {
          this.recentOrPendingRequest = false;
        }, 1000);
      })
      .catch(err => {
        console.log('error getting favorites in saved list:', err);
      });
  }

  removeSavedSpot(spotID) {
    favorites.remove(userService.currentUser.id, spotID);
    var newFavorites = this.state.favorites.filter(savedSpot =>
      savedSpot.id !== spotID);
    this.setState({ favorites: newFavorites });
  }

  orderBy(callback) {
    if (this.state.sortFunction !== callback) {
      this.setState({ sortFunction: callback });

      //now sort the favorites array in state
      //var favorites = this.state.favorites.sort(callback)

      this.setState({ favorites: this.state.favorites.sort(callback) });
    }
  }

  highestRated(a, b) {
    if (a.percentage < b.percentage) return 1;
    return -1;
  }

  distance(a, b) {
    if (a.distance < b.distance) return -1;
    return 1;
  }

  render() {
    if (!this.recentOrPendingRequest) {
      this.getFavoriteSpots();
      this.recentOrPendingRequest = true;
    }
    this.orderBy.bind(this);

    console.log(this.state.favorites);

    return (
      <View>
        <StatusBar barStyle='light-content' />
        <View style={styles.titleBarStyle}>
          <TouchableHighlight onPress={() => this.orderBy(this.distance)}>
            <Text style={styles.titleStyle}>Closest</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.orderBy(this.highestRated)}>
            <Text style={styles.titleStyle}>Popular</Text>
          </TouchableHighlight>
        </View>
        <ScrollView 
          style={styles.listStyle}
          contentContainerStyle={styles.listContainerStyle}
        >
          {
            // .sort( (a, b) => {
            //   if(a.distance < b.distance) return -1;
            //   else return 1;
            //   })
            this.state.favorites.map(spot => 
            <SavedItem
              key={spot.title}
              removeSavedSpot={this.removeSavedSpot.bind(this)}
              spot={spot}
              setSavedListState={this.props.setSavedListState}
              setCurrentView={this.props.setCurrentView}
            />)
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = {
 listStyle: {
  paddingTop: 5,
  //height: 500,
  height: height - 155,
  backgroundColor: '#EFEFF4'
 },
 listContainerStyle: {
 },
 titleBarStyle: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  backgroundColor: '#006F60',
  height: 90,
  paddingTop: 58,
  paddingBottom: 12
 },
 titleStyle: {
  fontSize: 18,
  alignSelf: 'center',
  color: '#EFEFF4'
 }
};
export default SavedList;
