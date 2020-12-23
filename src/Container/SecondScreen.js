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
import {Actions} from 'react-native-router-flux';
const {width, height} = Dimensions.get('window');
const apiPrefix = 'https://accounts.spotify.com/api';
const apiPrefix1 = 'https://api.spotify.com/v1';
const base64credentials =
  'OGNmNTM4MGY1ODhjNGVhMTg4NDk2ZTI1NGVkNjM3NjA6MjZjZjkxMTg2ZDdlNDBhMWI1ZmVlY2Y0NDlmNzk4MWI=';
const q = 'latest';
import {colors, images, commonStyles, strings, fonts} from '../themes';

class SecondScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayMusicLanugauge: [],

      selectedIds: [],
    };
    this.callendPointGet1();
  }

  async callendPointGet1() {
    const {
      navigation: {
        state: {params},
      },
    } = this.props;
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
    const uri = `https://api.spotify.com/v1/tracks/${params.selectedIds[0]}`;
    const res1 = await fetch(uri, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
    });
    const json1 = await res1.json();
    const {album} = json1;
    let itemsTracks = [
      {
        id: album.id,
        title: album.name,
        imageUri: album.images ? album.images[0].url : undefined,
        data: json1,
      },
    ];
    this.setState({arrayMusicLanugauge: itemsTracks});
  }

  componentWillUnmount() {}

  _renderItemsCategories(item, index) {
    let calculationWidth = width / 3 - 60;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{marginBottom: 2}}
        onPress={() => Actions.thirdScreen({data: item.data})}>
        <View
          style={{
            height: 130,
            width: 130,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 100,
              width: 100,
              backgroundColor: item.color,
              borderRadius: 50,
            }}>
            <Image
              source={{uri: item.imageUri}}
              resizeMode={'contain'}
              style={{
                height: '100%',
                width: '100%',
                alignSelf: 'flex-end',
                borderRadius: 50,
              }}
            />
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
                  right: -5,
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
          <Text
            numberOfLines={2}
            style={{
              color: 'white',
              fontSize: 12,
              textAlign: 'center',
              marginBottom: 10,
              marginTop: 10,
              width: '100%',
              maxWidth: '70%',
              marginBottom: 10,
            }}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderFooter = () => {
    return <View style={{height: 100, width: '100%'}} />;
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <SafeAreaView>
          <View
            style={{
              height: '10%',
              width: '100%',
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
                padding: 5,
                textAlign: 'center',
              }}>
              Choose 3 or more artist you like.
            </Text>
          </View>
          <FlatList
            data={this.state.arrayMusicLanugauge}
            ref={(ref) => {
              this.flatList_Ref = ref;
            }}
            numColumns={3}
            columnWrapperStyle={style.row}
            renderItem={({item, index}) =>
              this._renderItemsCategories(item, index)
            }
            ListFooterComponent={this.renderFooter}
            enableEmptySections={true}
            style={{height: '90%', width: '95%', alignSelf: 'center'}}
            keyExtractor={(item, index) => index.toString()}
            extraData={this.state}
          />
          {this.state.selectedIds.length !== 0 && (
            <TouchableOpacity
              style={{
                height: '7%',
                width: width / 2 - 50,
                backgroundColor: 'white',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginBottom: 10,
                position: 'absolute',
                alignSelf: 'center',
                bottom: 10,
              }}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
                {'Done'}
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

export default SecondScreen;
