import { useEffect as _useEffect } from "react";

export function LOG(...x) {
  console.log(...x);
  return x.pop();
}

export function valueIf(what, result, otherwise = "") {
  if (!(what instanceof Set)) {
    return valueIf(new Set(what), result, otherwise);
  }
  return i => (what.has(i) ? result : otherwise);
}

export function* range(start, stop = NaN, step = 1) {
  if (isNaN(stop)) {
    yield* range(0, start, step);
  } else if (step === 0) {
    throw RangeError("step argument cannot be 0.");
  } else if (step > 0) {
    for (let i = start; i < stop; i += step) {
      yield i;
    }
  } else {
    for (let i = start; i > stop; i += step) {
      yield i;
    }
  }
}

export function* map(iterable, callback) {
  if (!callback && typeof this === "function") {
    yield* map(this, callback);
  }
  let i = 0;
  for (const e of iterable) {
    yield callback(e, i++, iterable);
  }
}

export function* zip(...iterables) {
  iterables = iterables
    .filter(Boolean)
    .map(iter => ("next" in iter ? iter : iter[Symbol.iterator]()));
  while (true) {
    const zipped = [];
    for (const iter of iterables) {
      const { value, done } = iter.next();
      if (done) {
        return;
      }
      zipped.push(value);
    }
    yield zipped;
  }
}

export function* chain(...iterables) {
  for (const iter of iterables) {
    if (Object(iter) === iter && Symbol.iterator in iter) {
      yield* iter;
    } else {
      yield iter;
    }
  }
}

export function* cycle(iterable) {
  const cache = [];
  for (const e of iterable) {
    cache.push(e);
    yield e;
  }
  while (cache.length) {
    for (const e of cache) {
      yield e;
    }
  }
}

export function* head(iterable, n = 10) {
  iterable = "next" in iterable ? iterable : iterable[Symbol.iterator];
  for (let i = 0; i < n; i++) {
    const { value, done } = iterable.next();
    if (!done) yield value;
  }
}

/* Deep version of Object.assign */
export function deepAssign(target, ...sources) {
  const seen = new Map();
  return sources.reduce(function deepAssignFrom(t, src) {
    if (Object(t) !== t) {
      // RECURSE: Target not an object.
      return deepAssignFrom({}, src);
    } else if (seen.has(src)) {
      // RETURN: Source already seen before.
      return seen.get(src);
    } else if (Object(src) !== src || typeof src === "function") {
      // RETURN: Source not an object OR source is a function
      return src;
    }
    if (Symbol.iterator in src) {
      // RECURSE: Source is an iterator.
      t = [...src];
      seen.set(src, t);
      src.forEach((value, idx) => deepAssignFrom(t[idx], value));
      seen.delete(src);
    } else {
      // RECURSE: Source is an object.
      seen.set(src, t);
      Object.entries(src).forEach(([key, value]) => {
        t[key] = deepAssignFrom(t[key], value);
      });
      seen.delete(src);
    }
    // RETURN: Target populated.
    return t;
  }, target);
}

// Allow using a generator with `yield`-statements to register multiple destructors.
// Also allows an async function/generator.
// Be careful: Any values from a `return-statement of a generator will be discarded.
// Use a function instead of a generator if you wish to `return` a single destructor.
export function useEffect(effect, inputList) {
  _useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    effect = Object(effect());
    // Is return value iterable?
    if (!(Symbol.asyncIterator in effect || Symbol.iterator in effect)) {
      // Wrap if not.
      effect = [effect];
    }
    const destructors = [];
    const destroy = () => {
      cancel = true;
      destructors.splice(0, destructors.length).forEach(f => f());
    };
    let cancel = false;
    const runEffect = async () => {
      for await (const destructor of effect) {
        if (cancel) break;
        if (!destructor) continue;
        else if (typeof destructor === "function") {
          destructors.push(destructor);
        } else {
          console.error(
            `Warning: An effect function must not return anything ` +
              `besides a function, which is used for clean-up. ` +
              `You returned: ${destructor}`
          );
        }
      }
      if (cancel) destroy();
    };
    runEffect();
    return destroy;
  }, inputList);
}

