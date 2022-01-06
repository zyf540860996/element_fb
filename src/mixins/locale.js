import { t } from 'nasinet-element-ui_fb/src/locale';

export default {
  methods: {
    t(...args) {
      return t.apply(this, args);
    }
  }
};
