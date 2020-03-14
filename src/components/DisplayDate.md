Current date:

```js
<DisplayDate date={new Date()} />
```

About now:

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
      .subtract(4, 'seconds')
      .toDate()}
  />
</p>
```

Few seconds around:

```js
<p>
  <DisplayDate
    date={moment()
      .add(8, 'seconds')
      .toDate()}
  />
</p>
<p>
  <DisplayDate
    date={moment()
      .subtract(8, 'seconds')
      .toDate()}
  />
</p>
```

Seconds around:

```js
<p>
  <DisplayDate
    date={moment()
      .add(35, 'seconds')
      .toDate()}
  />
</p>
<p>
  <DisplayDate
    date={moment()
      .subtract(46, 'seconds')
      .toDate()}
  />
</p>
```

About a minute:

```js
<p>
  <DisplayDate
    date={moment()
      .add(59, 'seconds')
      .toDate()}
  />
</p>
<p>
  <DisplayDate
    date={moment()
      .subtract(65, 'seconds')
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
      .subtract(40, 'minutes')
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
      .subtract(62, 'minutes')
      .toDate()}
  />
</p>
```

Few hours around:

```js
<p>
  <DisplayDate
    date={moment()
      .add(6, 'hours')
      .toDate()}
  />
</p>
<p>
  <DisplayDate
    date={moment()
      .subtract(23, 'hours')
      .toDate()}
  />
</p>
```

Few days around:

```js
<p>
  <DisplayDate
    date={moment()
      .add(6, 'days')
      .toDate()}
  />
</p>
<p>
  <DisplayDate
    date={moment()
      .subtract(23, 'days')
      .toDate()}
  />
</p>
```

Few months around:

```js
<p>
  <DisplayDate
    date={moment()
      .add(6, 'months')
      .toDate()}
  />
</p>
<p>
  <DisplayDate
    date={moment()
      .subtract(9, 'months')
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
