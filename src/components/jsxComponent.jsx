const ButtonCounter = {
  name: 'button-counter',
  props: ['count'],
  methods: {
    onClick() {
      this.$emit('change', this.count + 1);
    },
  },
  render() {
    return <button onClick={this.onClick}>You clicked me {this.count} times.</button>;
  },
};

export default {
  name: 'button-counter-container',
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    onChange(val) {
      this.count = val;
    },
  },
  render() {
    const {count, onChange} = this;
    return (
      <div>
        <ButtonCounter count={count} type='button' onChange={onChange} />
        <ButtonCounter count={count} type='button' onChange={onChange} />
      </div>
    );
  },
};
