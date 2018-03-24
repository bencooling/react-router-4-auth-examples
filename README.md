# React Router 4 Auth Examples

## 1

- 2 routes: protected and public. 
- login/logout button.
- protected redirects to public if not logged in.
- protected fetches data from github api before rendering
- Uses: withRouter, Route render.
- Only works for browser session (can't type route in address bar/refresh page)


## 2 (TODO)

TODO:
- Fetch data on two different routes, not just on login
- Use [lifecycle hooks](https://stackoverflow.com/a/45430656)
- Use [session cookies](https://httpbin.org)

```
componentWillMount() { // or componentDidMount
  fetch(this.props.match.params.id)
}

componentWillReceiveProps(nextProps) { // or componentDidUpdate
  if (nextProps.match.params.id !== this.props.match.params.id) {
    fetch(nextProps.match.params.id)
  }
}
```


## resources

- [onEnter prop in react-router v4](https://stackoverflow.com/a/45430656)