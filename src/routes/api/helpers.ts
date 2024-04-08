export async function fetchAdsForCategories(fetch, category) {
  console.log(category);
  try {
    const response = await fetch(`api/?category=${category}`);
    console.log('banan');
    if (!response.ok) {
      console.log('ner')
      throw new Error(`Network response was not ok for category: ${category}`);
      
    }
    return await response.json();
  } catch (error) {
    console.log('err')
    throw new Error(`Error fetching data for ${category}: ${error.message}`);
    
  }
}



// export async function fetchAdsForCategories(fetch, ...categories) {
//   try {
//     const fetchPromises = categories.map(category =>
//       fetch(`./api/?category=${category}`).then(response => {
//         if (!response.ok) {
//           throw new Error(`Network response was not ok for category: ${category}`);
//         }
//         return response.json();
//       })
//     );

//     const results = await Promise.all(fetchPromises);
    
//     return categories.reduce((acc, category, index) => {
//       acc[category] = results[index];
//       return acc;
//     }, {});
    
//   } catch (error) {
//     throw new Error(`Error fetching data: ${error.message}`);
//   }
// }
