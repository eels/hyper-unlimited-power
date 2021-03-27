# :tada: hyper-unlimited-power

Achy-breaky, shakey-shakey and confetti.\
Another configurable [Hyper](https://hyper.is/]) power-mode plugin.

<p align="center">
  <img src="https://user-images.githubusercontent.com/9451626/111384154-14196f80-86a1-11eb-80a6-e45583f61917.gif">
</p>

## Installation

Add the following to your `~/.hyper.js` plugin array.

```javascript
module.exports = {
  ...
  plugins: [
    'hyper-unlimited-power'
  ]
  ...
};
```

## Config Options

Add any of the following to your `~/.hyper.js` config object.

### Enable Rainbow Particle Colors

<p align="center">
  <img src="https://user-images.githubusercontent.com/9451626/111384544-8d18c700-86a1-11eb-8f89-cc3c8fd1ad57.gif">
</p>

Type: `bool`\
Default value: `true`

```javascript
module.exports = {
  config: {
    ...
    hyperUnlimitedPower: {
      isRainbowEnabled: true
    }
    ...
  }
};
```

### Enable Combo Mode

<p align="center">
  <img src="https://user-images.githubusercontent.com/9451626/111672467-e7d13080-8811-11eb-8653-d1f9d01f95b8.gif">
</p>

Type: `bool`\
Default value: `true`

```javascript
module.exports = {
  config: {
    ...
    hyperUnlimitedPower: {
      isComboEnabled: true
    }
    ...
  }
};
```

### Enable Permanent Screen Shake

<p align="center">
  <img src="https://user-images.githubusercontent.com/9451626/111384472-74101600-86a1-11eb-895a-05f868b052c7.gif">
</p>

Type: `bool`\
Default value: `false`

```javascript
module.exports = {
  config: {
    ...
    hyperUnlimitedPower: {
      isEarthquakeEnabled: true
    }
    ...
  }
};
```

### Static Particle Colors

<p align="center">
  <img src="https://user-images.githubusercontent.com/9451626/111384576-96a22f00-86a1-11eb-9a5e-83f304a2f9dc.gif">
</p>

Type: `"false"|string|string[]`\
Default value: `false`

```javascript
module.exports = {
  config: {
    ...
    hyperUnlimitedPower: {
      isRainbowEnabled: false,
      staticParticleColors: ['red', 'yellow']
    }
    ...
  }
};
```

### Maximum Number of Particles

<p align="center">
  <img src="https://user-images.githubusercontent.com/9451626/111384710-be919280-86a1-11eb-9e5c-13a46396393b.gif">
</p>

Type: `number`\
Default value: `20`

```javascript
module.exports = {
  config: {
    ...
    hyperUnlimitedPower: {
      maxParticleCount: 50
    }
    ...
  }
};
```

### Particle Velocity Range

<p align="center">
  <img src="https://user-images.githubusercontent.com/9451626/111384762-c7826400-86a1-11eb-92ec-01ad603798f3.gif">
</p>

Type: `object`\
Default value: `{ x: [-1, 1], y: [-2, -0.5] }`

```javascript
module.exports = {
  config: {
    ...
    hyperUnlimitedPower: {
      particleVelocityRange: {
        x: [-1, 1],
        y: [-2.5, -1.5]
      }
    }
    ...
  }
};
```

## Secret Config Options

#### `comboActivationThreshold`

Type: `number`\
Default value: `15`

#### `comboTimeUntilDecay`

Type: `number`\
Default value: `2000`

#### `particleAlphaFadeout`

Type: `number`\
Default value: `0.92`

#### `particleAlphaMinThreshold`

Type: `number`\
Default value: `0.1`

#### `particleGravity`

Type: `number`\
Default value: `0.075`

#### `shakeIntensity`

Type: `number`\
Default value: `1`

## License

MIT - see the [LICENSE.md](https://github.com/eels/hyper-unlimited-power/blob/main/LICENSE.md) file for details

## Acknowledgments & Credits

* Inspired by the original [hyperpower](https://github.com/vercel/hyperpower) plugin
* Which in turn was based on [power-mode](https://atom.io/packages/power-mode) and [RagePower](https://github.com/itszero/rage-power) 
* With additional fixes from [MajorBreakfast](https://github.com/MajorBreakfast) in ([#75](https://github.com/vercel/hyperpower/pull/75))
