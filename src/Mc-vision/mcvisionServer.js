

var myHeaders = new Headers()
myHeaders.append('Accept', '*/*')
myHeaders.append('Host', 'traceserv-sit.sccc.mcdchina.net')
myHeaders.append('Connection', 'keep-alive')

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  redirect: 'follow',
}

// fetch("http://traceserv-sit.sccc.mcdchina.net/sccc-traceserv/hks/stove/measure/temp/query?timestamp=2024-09-11%202010:09:55", requestOptions)
//    .then(response => response.text())
//    .then(result => console.log(result))√
//    .catch(error => console.log('error', error));
//@ts-ignore
export const queryTemp = async () => {
  return new Promise((resolve) => {
    //@ts-ignore
    fetch(
      `http://traceserv-sit.sccc.mcdchina.net/sccc-traceserv/hks/stove/measure/temp/query`,
      //@ts-ignore
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data)
        resolve(data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  })
  //@ts-ignore
  // const data = await
  // console.log(data.json(),'ffff')
  // return data
}
// const prefix = '/device'

// var myHeaders = new Headers();
// myHeaders.append("Accept", "*/*");
// myHeaders.append("Host", "traceserv-sit.sccc.mcdchina.net");
// myHeaders.append("Connection", "keep-alive");
// myHeaders.append("Content-Type", "multipart/form-data");

//@ts-ignore
// export const queryTemp = fetch(`http://traceserv-sit.sccc.mcdchina.net/sccc-traceserv/hks/stove/measure/temp/query?timestamp=2024-09-11%202010:09:55`, {
//     method: "POST",
//     // mode: "cors",
//     // body: JSON.stringify(),
//     headers: myHeaders,
//     redirect: 'follow'
// });

// export const queryTemp = () =>
//     fetch(`http://traceserv-sit.sccc.mcdchina.net/sccc-traceserv/stove/measure/temp/query?timestamp=${moment().format('YYYY-MM-DD HH:MM:SS')}`, {
//         method: "POST",
//         mode: "cors",
//     }).then(res => {
//         console.log(res)
//     })
// http<PaginationResp<DeviceApi.DeviceInfo>>({
//     url: `/temp/query`,
//     method: 'POST',
// data: {
//     timestamp: moment().format('YYYY-MM-DD HH:MM:SS')
// },
//     baseUrl: '/stove/measure'
// })

// export const queryTemp = () => http<number>({
//     url: `/hks/stove/measure/temp/query?timestamp=${moment().format('YYYY-MM-DD HH:MM:SS')}`,
//     method: 'POST',
//     // baseUrl:'/'
// })

// export const createDevice = (data: DeviceApi.OperateNodeReq) =>
//     http<number>({
//         url: `${prefix}/createDevice`,
//         method: 'POST',
//         data,
//     })

// export const updateDevice = (data: DeviceApi.OperateNodeReq) =>
//     http<number>({
//         url: `${prefix}/updateDevice`,
//         method: 'POST',
//         data,
//     })

// export const invalidateDevice = (id: DeviceApi.DeviceInfo['deviceId']) =>
//     http({
//         url: `${prefix}/invalidateDevice?deviceId=${id}`,
//         method: 'POST',
//     })

export const queryTrash = async () => {
  return new Promise((resolve) => {
    //@ts-ignore
    fetch(
      `http://traceserv-sit.sccc.mcdchina.net/sccc-traceserv/hks/food/drawer/operation/query?timestamp=${'2024-09-01 00:00:00'}`,
      //@ts-ignore
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data)
        resolve(data.data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  })
  //@ts-ignore
  // const data = await
  // console.log(data.json(),'ffff')
  // return data
}

export const queryOrder = async (data: boolean) => {
  return new Promise((resolve) => {
    //@ts-ignore
    fetch(
      `http://traceserv-sit.sccc.mcdchina.net/sccc-traceserv/hks/plateId/food/query?plateIdF=${data}`,
      //@ts-ignore
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data)
        resolve(data.data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  })
  //@ts-ignore
  // const data = await
  // console.log(data.json(),'ffff')
  // return data
}
