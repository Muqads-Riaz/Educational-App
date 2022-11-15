import './Table.css'
function MyTable(props) {
    const { datasource, Cols } = props; 
    return (
      <>
        {Cols && Array.isArray(Cols) && (
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                {/* <th>s#</th> */}
                {Cols.map((y, i) => (
                  <th key={i}>{y.displayName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {datasource &&
              Array.isArray(datasource) &&
              datasource.length > 0 ? (
                datasource.map((x, i) => (
                  <tr key={i}>
                    {/* <td>{i + 1}</td> */}
                    {Cols.map((y, ind) => (
                      <td key={ind}>{x[y.key]}</td>
                    ))}
                  </tr>
                ))
              ) :  <h1 style={{textAlign:"center"}} >No Data Found</h1>
              }
            </tbody>
          </table>
        )}
      </>
    );
  }
  export default MyTable;

//   <MyTable
//   datasource={citiesList}
//   Cols={[
//     {
//       key: "cityName",
//       displayName: "City Name",
//     },
//     {
//       key: "cityCode",
//       displayName: "City Code",
//     },
//     {
//       key: "countryName",
//       displayName: "Country Name",
//     },
//   ]}
// />
