# Decisions

## Refactor

After my _first pass_ at this, which was time limited to 2-3 hours, I decided to spend a bit more time on it and to put into practice what I'd been learning in [Epic React](https://epicreact.dev/).

- The `children` API doesn't have paging or details about the number of results, so I've faked this by created a simple cache on the first request which also states the `total` count.
- Subsequest requests for data call it from the cache. I did this to emulate an API that doesn't return a full dataset more realistically.
- The _child list_ still returns 10 at a time with a _load more_ button.
- State is managed through React Context with a reducer for event handling.
- Context contains a `next` parameter which is start point from which the next request should start.
- Maybe as my next exercise I'll turn this into _paging_ rather than a load more.
- Functionality is more componentised, with `src/components/CheckinToggle.tsx` in particular responsible for checking in and out and as it uses `src/hooks/useAsync.ts` with a status manager it prevents accidental multiple requests.
- I've also added an ErrorBoundary to `CheckinToggle` to localise error to that component with the ability to _retry_ the request.

## Original Notes

- The project is built using [Vite](https://vitejs.dev/) which is super fast.
- I know it says to not worry about styling, but I added some basics using [OpenProps](https://open-props.style/)
- The AttendanceManagement component is wrapped in [react-error-boundary](https://www.npmjs.com/package/react-error-boundary) - See `src/App.tsx`. This is a re-usable components that allows a fallback component to be passed in, and also allows resetting the boundary if it is invoked (e.g. for a try again button).
- I've recently been doing the [Epic React](https://epicreact.dev/) course so the `useAsync` and `useSafeDispatch` methods are fresh in my mind. These handle data fetching and prevention of sending data to an unmounted component.
- Load more functionality is faked in `src/components/AttendanceList.tsx` by putting the returned data into local state and only displaying 10 from that array. The load more button simply adds 10 to the `loadCount` to update. Mmm, basic.
- Checkin and Checkout states are copied to a `useState` within `src/components/AttendanceList.tsx`. That way I can keep a track of the current status without needing to recall the data from the API. This could mean that state gets out of sync, though there is error handling should an update fail.
- Checkin and Checkout could also follow a pattern similar to `useAsync` in setting states so feedback could be shown while the processes are happening.

## Final thoughts

- Mimicking the load more funcationality would have been better done within `src/utils/fetchClients.ts`. That way `src/components/AttendanceList.tsx` would have been free from state leaving a more lighweight and _dumb_ component.
- As mentioned above, checkin and checkout functionality could be abstracted and their functionality wrapped in an error boundary so any failure on their part could be recovered from with a "try again" button.
- There aren't any unit tests but with the abstractions mentioned above there would be a seperation of concerns that would allow display and functionality to be tested independently. I'm a fan of [testing-library](https://testing-library.com/) as it creates a good mindset around testing from a _users_ point of view.
- If you're running this with `npm run dev` don't forget to copy `.env.example` to `.env` and add the tokens.

---

# Interested in working for Famly?

Give us a chance to see your beautiful code! 🤩

How to get started:

- Fork this repository
- Create a small application in React (or another agreed upon framework)
- Describe your design decisions and setup instructions in the README.md of the forked repository

## The assignment

You are tasked to build a simple application for a nursery to manage the attendance of children each day.

The application should be able to do 3 things:

1. List children with some form of pagination/lazy-loading/infinite-scroll
2. Checkin a child
3. Checkout a child

There are no other requirements than that—don't worry about design or anything like that.

If you have any questions feel free to reach out to ckl@famly.co (Christian) or ab@famly.co (Adam) ☺️

## API Specification

You will receive an access token in an email during the recruiment process.

### Fetch some children from

The API does not support any limit or offset, so the pagination/lazy-loading/infinite-scroll will have to be done client-side only.

```
GET https://app.famly.co/api/daycare/tablet/group
Arguments: {
	accessToken: <accessToken>,
	groupId: '86413ecf-01a1-44da-ba73-1aeda212a196',
	institutionId: 'dc4bd858-9e9c-4df7-9386-0d91e42280eb'
}
```

Example in cURL:

```bash
curl "https://app.famly.co/api/daycare/tablet/group?accessToken=<accessToken>&groupId=86413ecf-01a1-44da-ba73-1aeda212a196&institutionId=dc4bd858-9e9c-4df7-9386-0d91e42280eb"
```

### Checkin child

```
POST https://app.famly.co/api/v2/children/<childId>/checkins

Arguments: {
	accessToken: <accessToken>
	pickupTime: 16:00
}
```

Example in cURL:

```bash
curl \
  -d 'accessToken=<accessToken>&pickupTime=16:00' \
  https://app.famly.co/api/v2/children/fcd683d0-bc31-468c-948f-1ca70b91439d/checkins
```

### Checkout child

```
POST https://app.famly.co/api/v2/children/<childId>/checkout
Arguments: {
	accessToken: <accessToken>
}
```

Example in cURL:

```bash
curl \
  -d 'accessToken=<accessToken>' \
  https://app.famly.co/api/v2/children/fcd683d0-bc31-468c-948f-1ca70b91439d/checkout
```
