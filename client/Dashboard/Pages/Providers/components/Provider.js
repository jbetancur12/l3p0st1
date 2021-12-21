import React, { useEffect } from 'react';
import { read } from '../../../../core/api-providers';

function Provider(props) {
  useEffect(async () => {
    const _product = await read(props.match.params.id);

    console.log(_product);
  }, []);
  return <div>Hola</div>;
}

export default Provider;
