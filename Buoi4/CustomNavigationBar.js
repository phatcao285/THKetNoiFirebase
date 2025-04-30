import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { StatusBar } from 'react-native';

function CustomNavigationBar({ navigation, route, options, back }) {
  const title = getHeaderTitle(options, route.name);
  const theme = useTheme();

  return (
    <>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
      <Appbar.Header>
        {back ? (
          <Appbar.BackAction onPress={navigation.goBack} />
        ) : (
          <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        )}
        <Appbar.Content title={title} />
      </Appbar.Header>
    </>
  );
}

export default CustomNavigationBar;