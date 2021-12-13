export default async ($content, path, error) => {
  const fixedPath = (path === '' || path === '/') ? 'index' : path
  return await $content(fixedPath).fetch()
    // eslint-disable-next-line node/handle-callback-err
    .catch((err) => {
      error({ statusCode: 404, message: 'Page not found' })
    })
}
