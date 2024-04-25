// export async function onRequestGet(context) {
//     // Tutaj używamy context.env, aby odwołać się do zmiennych środowiskowych lub Service Binding
//     return context.env.TRANZAURUS.fetch(context.request);
// }


// export async function GET({ request }) {
//     // URL Twojego Workera
//     const workerUrl = 'https://twojworker.yourdomain.workers.dev';

//     // Opcjonalnie, możesz dodać jakieś opcje, np. nagłówki, metodę itp.
//     const options = {
//         method: 'GET', // lub 'POST', 'PUT' etc., w zależności od Twoich potrzeb
//         // headers: {}, // Jeśli potrzebujesz przekazać nagłówki
//     };

//     // Wykonaj zapytanie do Workera
//     const response = await fetch(workerUrl, options);

//     // Przetwórz odpowiedź
//     const data = await response.json();

//     // Zwróć odpowiedź do klienta
//     return new Response(JSON.stringify(data), {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
// }
