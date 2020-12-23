import React from 'react';
import {
  View,
  FlatList,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {colors, images, commonStyles, strings, fonts} from '../themes';
import {Actions} from 'react-native-router-flux';

const {width, height} = Dimensions.get('window');
const apiPrefix = 'https://accounts.spotify.com/api';
const apiPrefix1 = 'https://api.spotify.com/v1';
const base64credentials =
  'OGNmNTM4MGY1ODhjNGVhMTg4NDk2ZTI1NGVkNjM3NjA6MjZjZjkxMTg2ZDdlNDBhMWI1ZmVlY2Y0NDlmNzk4MWI=';
const q = 'latest';

class FirstScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayMusicLanugauge:[],
      selectedIds: [],
    };
  }
  handleSelectionMultiple = (id) => {
    var selectedIds = [...this.state.selectedIds];
    if (selectedIds.includes(id))
      selectedIds = selectedIds.filter((_id) => _id !== id);
    else {
      selectedIds.push(id);
    }
    this.setState({selectedIds});
  };

  async componentDidMount() {
    this.callendPoint();
  }

  componentWillUnmount() {}

  async callendPoint() {
    console.log('token begin');
    const res = await fetch(`${apiPrefix}/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${base64credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });
    const json = await res.json();
    const newToken = json.access_token;
    const data = await fetch('https://ipapi.co/json/');
    const jsonCountry = await data.json();
    console.log('hye data jow',jsonCountry)
    // const uri = `${apiPrefix1}/search?type=track&limit=${10}&offset=${10}&q=${encodeURIComponent(
    //   q,
    // )}`;
    const uri =
    `https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=50&market=${jsonCountry.country}`;
    console.log('search begin, uri =', uri, 'token =', newToken);
    const res1 = await fetch(uri, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
    });
    const json1 = await res1.json();
    console.log('search got json', json1);

    if (!res.ok) {
      return [];
    }

    const {tracks} = json1;
    // const items = json.tracks.items;
    let itemsTracks = tracks.map((item) => ({
      id: item.id,
      title: item.name,
      imageUri: item.album.images ? item.album.images[0].url : undefined,
      totalTracks: item.album.total_tracks,

    }));
    this.setState({arrayMusicLanugauge: itemsTracks});
  }


  async callendPointGet1() {
    console.log('token begin');
    const res = await fetch(`${apiPrefix}/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${base64credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });
    const json = await res.json();
    const newToken = json.access_token;
    const uri = `${apiPrefix1}/search?type=track&limit=${10}&offset=${10}&q=${encodeURIComponent(
      q,
    )}`;
    console.log('search begin, uri =', uri, 'token =', newToken);
    const res1 = await fetch(uri, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
    });
    const json1 = await res1.json();
    console.log('search got json', json1);

    if (!res.ok) {
      return [];
    }

    const {
      tracks: {items},
    } = json1;
    // const items = json.tracks.items;
    let itemsTracks = items.map((item) => ({
      id: item.id,
      title: item.name,
      imageUri: item.album.images ? item.album.images[0].url : undefined,
    }));
    this.setState({arrayMusicLanugauge: itemsTracks});
  }

  _renderItemsCategories(item, index) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          height: 80,
          width: width / 2 - 25,
          backgroundColor: 'orange',
          borderRadius: 10,
        }}
        onPress={() => this.handleSelectionMultiple(item.id)}>
        <View style={{height: '100%', width: '99%', alignSelf: 'center'}}>
          <View>
            <View
              style={{
                height: '30%',
                width: '100%',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={1}
                style={{color: colors.white, fontWeight: 'bold', left: 6, top: 3, maxWidth: '90%'}}>
                {item.title}
              </Text>
            </View>
            <View
              style={{
                height: '70%',
                width: '100%',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                alignSelf: 'flex-end',
                flexDirection: 'row'
              }}>
              <View style={{height: '100%',width:"50%"}}>
              <Image
                source={{uri: item.imageUri}}
                resizeMode={'contain'}
                style={{height: '100%', width: '100%', alignSelf: 'flex-end'}}
              />
              </View>
              <View style={{height: '100%',width:"50%"}}>
              <Text>{item.totalTracks}</Text>
              </View>
            </View>
          </View>
          {this.state.selectedIds.includes(item.id) && (
            <View
              style={{
                position: 'absolute',
                height: 24,
                width: 24,
                borderRadius: 12,
                backgroundColor: 'white',
                alignSelf: 'flex-end',
                margin: 7,
                right: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={images.check_Icon}
                resizeMode={'contain'}
                style={{height: '60%', width: '60%'}}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.colorBlack}}>
        <SafeAreaView>
          <View
            style={{
              height: '10%',
              width: '100%',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: colors.white,
                padding: 5,
                textAlign: 'center',
              }}>
              What Music do you like ?
            </Text>
          </View>
          <FlatList
            data={this.state.arrayMusicLanugauge}
            ref={(ref) => {
              this.flatList_Ref = ref;
            }}
            numColumns={2}
            columnWrapperStyle={style.row}
            renderItem={({item, index}) =>
              this._renderItemsCategories(item, index)
            }
            enableEmptySections={true}
            style={{height: '90%', width: '95%', alignSelf: 'center'}}
            keyExtractor={(item, index) => index.toString()}
            extraData={this.state}
          />
          {this.state.selectedIds.length !== 0 && (
            <TouchableOpacity
             onPress={() => Actions.secondScreen({selectedIds: this.state.selectedIds})}
              style={{
                height: '7%',
                width: width / 2 - 50,
                backgroundColor: colors.white,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginBottom: 10,
                position: 'absolute',
                alignSelf: 'center',
                bottom: 10,
              }}>
              <Text style={{color: colors.colorBlack, fontWeight: 'bold', fontSize: 18}}>
                {'Next'}
              </Text>
            </TouchableOpacity>
          )}

        </SafeAreaView>
      </View>
    );
  }
}
const style = StyleSheet.create({
  row: {
    margin: 5,
    justifyContent: 'space-around',
  },
});
export default FirstScreen;

