const Color = require('color');
const PropTypes = require('prop-types');
const colorNameToHex = require('convert-css-color-name-to-hex');
const electron = require('electron');
const throttle = require('lodash.throttle');

exports.decorateTerm = (Term, { React }) => {
  const HYPER_UNLIMITED_CONFIG = {};
  const config = electron.remote.app.config.getConfig();

  Object.entries(config.hyperUnlimitedPower || {}).map(([key, value]) => {
    HYPER_UNLIMITED_CONFIG[key] = value;
  });

  class DecoratedTerm extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.comboDecay = this.comboDecay.bind(this);
      this.config = this.setConfigurationOptions();
      this.drawFrame = this.drawFrame.bind(this);
      this.getColorSpectrum = this.getColorSpectrum.bind(this);
      this.handleOnCursorMove = this.handleOnCursorMove.bind(this);
      this.handleOnDecorated = this.handleOnDecorated.bind(this);
      this.initCanvas = this.initCanvas.bind(this);
      this.resizeCanvas = this.resizeCanvas.bind(this);
      this.shake = throttle(this.shake.bind(this), 100, { trailing: false });
      this.spawnParticles = throttle(this.spawnParticles.bind(this), 25, { trailing: false });

      this.canvas = null;
      this.canvasContext = null;
      this.comboDecayTimer = null;
      this.div = null;
      this.particles = [];
      this.state = this.initialState;
    }

    componentWillUnmount() {
      if (null !== this.canvas) {
        document.body.removeChild(this.canvas);
      }
    }

    get initialState() {
      return {
        cursorMovementsMade: 0,
        isComboActive: false
      };
    }

    handleOnCursorMove(cursorFrame) {
      const { onCursorMove } = this.props;
      const { cursorMovementsMade, isComboActive } = this.state;
      const { comboActivationThreshold, comboTimeUntilDecay, isComboEnabled, isEarthquakeEnabled } = this.config;
      const { x, y } = cursorFrame;
      const origin = this.div.getBoundingClientRect();
      const nextCursorMovementsMade = cursorMovementsMade + 1;
      const nextComboActiveState = isComboEnabled && (isComboActive || comboActivationThreshold < nextCursorMovementsMade);

      if (isComboEnabled) {
        clearTimeout(this.comboDecayTimer);
        this.comboDecayTimer = setTimeout(() => this.comboDecay(), comboTimeUntilDecay);
        this.setState({ cursorMovementsMade: nextCursorMovementsMade, isComboActive: nextComboActiveState });
      }

      onCursorMove && onCursorMove(cursorFrame);
      (isEarthquakeEnabled || nextComboActiveState) && this.shake();

      window.requestAnimationFrame(() => {
        this.spawnParticles(x + origin.left, y + origin.top);
      });
    }

    handleOnDecorated(term) {
      const { onDecorated } = this.props;

      onDecorated && onDecorated(term);

      this.div = term ? term.termRef : null;
      this.initCanvas();
    }

    getColorSpectrum() {
      const { colors, cursorColor } = this.props;
      const { isRainbowEnabled, staticParticleColors } = this.config;

      if (isRainbowEnabled) {
        return Object.values(colors).map(this.colorToHex);
      }

      if (false !== staticParticleColors) {
        return Array.isArray(staticParticleColors) ? staticParticleColors : [staticParticleColors];
      }

      return [this.colorToHex(cursorColor)];
    }

    setConfigurationOptions() {
      return Object.assign({
        comboActivationThreshold: 15,
        comboTimeUntilDecay: 2000,
        isComboEnabled: true,
        isEarthquakeEnabled: false,
        isRainbowEnabled: true,
        maxParticleCount: 20,
        particleAlphaFadeout: 0.96,
        particleAlphaMinThreshold: 0.1,
        particleGravity: 0.075,
        particleVelocityRange: {
          x: [-1, 1],
          y: [-2.5, -1.5]
        },
        shakeIntensity: 1,
        staticParticleColors: false
      }, HYPER_UNLIMITED_CONFIG);
    }

    colorToHex(name) {
      return Color(colorNameToHex(name)).hexString();
    }

    comboDecay() {
      this.setState(this.initialState);
    }

    createParticle(x, y, color) {
      const { particleVelocityRange } = this.config;

      const alpha = 1;
      const velocity = {
        x: particleVelocityRange.x[0] + Math.random() * (particleVelocityRange.x[1] - particleVelocityRange.x[0]),
        y: particleVelocityRange.y[0] + Math.random() * (particleVelocityRange.y[1] - particleVelocityRange.y[0])
      };

      return { alpha, color, velocity, x, y };
    }

    drawFrame() {
      const { needsRedraw } = this.props;
      const { maxParticleCount, particleAlphaFadeout, particleAlphaMinThreshold, particleGravity } = this.config;

      this.particles.length && this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.particles.forEach((particle) => {
        particle.velocity.y += particleGravity;
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        particle.alpha *= particleAlphaFadeout;

        if (particle.alpha > particleAlphaMinThreshold) {
          this.canvasContext.fillStyle = `rgba(${particle.color.join(',')}, ${particle.alpha})`;
          this.canvasContext.fillRect(Math.round(particle.x - 1), Math.round(particle.y - 1), 3, 3);
        }
      });

      this.particles = this.particles.slice(Math.max(this.particles.length - maxParticleCount, 0));
      this.particles = this.particles.filter((particle) => particle.alpha > particleAlphaMinThreshold);

      if (0 < this.particles.length || needsRedraw) {
        window.requestAnimationFrame(this.drawFrame);
      }

      this.props.needsRedraw = (0 === this.particles.length);
    }

    generateParticleAmount() {
      return 5 + Math.round(Math.random() * 5);
    }

    initCanvas() {
      this.canvas = document.createElement('canvas');
      this.canvas.style.position = 'absolute';
      this.canvas.style.top = '0';
      this.canvas.style.pointerEvents = 'none';
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.canvasContext = this.canvas.getContext('2d');

      document.body.appendChild(this.canvas);
      window.requestAnimationFrame(this.drawFrame);
      window.addEventListener('resize', this.resizeCanvas);
    }

    resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    shake() {
      const { shakeIntensity } = this.config;
      const intensity = shakeIntensity + 2 * Math.random();
      const x = intensity * (0.5 < Math.random() ? -1 : 1);
      const y = intensity * (0.5 < Math.random() ? -1 : 1);

      this.div.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      setTimeout(() => {
        if (this.div) {
          this.div.style.transform = '';
        }
      }, 75);
    }

    spawnParticles(x, y) {
      const length = this.particles.length;
      const spectrum = this.getColorSpectrum();
      const particleAmount = this.generateParticleAmount();

      Array.from(Array(particleAmount).keys()).map((i) => {
        const colorCode = spectrum[i % spectrum.length];
        const r = parseInt(colorCode.slice(1, 3), 16);
        const g = parseInt(colorCode.slice(3, 5), 16);
        const b = parseInt(colorCode.slice(5, 7), 16);
        const color = [r, g, b];

        this.particles.push(this.createParticle(x, y, color));
      });

      0 === length && window.requestAnimationFrame(this.drawFrame);
    }

    render() {
      return React.createElement(Term, Object.assign({}, this.props, {
        onCursorMove: this.handleOnCursorMove,
        onDecorated: this.handleOnDecorated
      }));
    }
  }

  DecoratedTerm.propTypes = {
    colors: PropTypes.object,
    cursorColor: PropTypes.string,
    needsRedraw: PropTypes.bool,
    onCursorMove: PropTypes.func,
    onDecorated: PropTypes.func
  };

  return DecoratedTerm;
};
