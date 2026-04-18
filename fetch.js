async function run() {
  const res = await fetch('https://unsplash.com/photos/YsMg1pJqqKk/download', { redirect: 'manual' });
  console.log(res.status, res.headers.get('location'));
}
run();
