Current date:

```js
<DisplayDate date={new Date()} />
```

Less than a minute:

```js
<p>
  <DisplayDate
    date={moment()
      .add(2, 'seconds')
      .toDate()}
  />
</p>
<p>
  <DisplayDate
    date={moment()
      .subtract(59, 'seconds')
      .toDate()}
  />
</p>
```

One minute:

```js
<p>
  <DisplayDate
    date={moment()
      .add(60, 'seconds')
      .toDate()}
  />
</p>
<p>
  <DisplayDate
    date={moment()
      .subtract(80, 'seconds')
      .toDate()}
  />
</p>
```

Few minutes around:

```js
<p>
  <DisplayDate
  date={moment()
      .add(26, 'minutes')
      .toDate()}
  />
</p>
<p>
  <DisplayDate
    date={moment()
      .subtract(59, 'minutes')
      .toDate()}
  />
</p>
```

About one hour:

```js
<p>
  <DisplayDate
    date={moment()
      .add(58, 'minutes')
      .toDate()}
  />
</p>
<p>
  <DisplayDate
    date={moment()
      .subtract(61, 'minutes')
      .toDate()}
  />
</p>
```

Few hours around:

```js
<p>
  <DisplayDate
    date={moment()
      .subtract(2, 'hours')
      .toDate()}
  />
</p>
<p>
  <DisplayDate
    date={moment()
      .add(2, 'hours')
      .toDate()}
  />
</p>
```

Tomorrow / Yesterday:

```js
<p>
  <DisplayDate
    date={moment()
      .add(24, 'hours')
      .toDate()}
  />
</p>
<p>
  <DisplayDate
    date={moment()
      .subtract(24, 'hours')
      .toDate()}
  />
</p>
```

Few days within same year:

```js
<p>
  <DisplayDate
    date={moment()
      .add(3, 'days')
      .toDate()}
  />
</p>
<p>
  <DisplayDate
    date={moment()
      .subtract(3, 'days')
      .toDate()}
  />
</p>
```

Few years around:

```js
<p>
  <DisplayDate
    date={moment()
      .add(6, 'years')
      .toDate()}
  />
</p>
<p>
  <DisplayDate
    date={moment()
      .subtract(23, 'years')
      .toDate()}
  />
</p>
```
