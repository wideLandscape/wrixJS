export const set = (chainedObject, config) => {
  Object.keys(config).reduce((object, key) =>
    (object[key] && typeof object[key] === 'function' ? object[key](config[key]) : object), chainedObject)
}
