function randomNumber(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      pHealth: 100,
      mHealth: 100,
      roundBattle: 0,
      statusBattle: null,
      battleLog: [],
    };
  },
  computed: {
    mHealthBar() {
      return { width: this.mHealth + "%" };
    },
    pHealthBar() {
      return { width: this.pHealth + "%" };
    },
    useSpecialAtt() {
      return this.roundBattle % 3 !== 0;
    },
    useHealPlayer() {
      return this.roundBattle % 2 !== 0;
    },
    disableButton() {
      return this.statusBattle !== null;
    },
  },
  watch: {
    pHealth(x) {
      if (x <= 0 && this.mHealth <= 0) {
        this.statusBattle = "Draw";
      } else if (x <= 0) {
        this.statusBattle = "Monster";
      }
    },
    mHealth(x) {
      if (x <= 0 && this.pHealth <= 0) {
        this.statusBattle = "Draw";
      } else if (x <= 0) {
        this.statusBattle = "Player";
      }
    },
  },
  methods: {
    attMonster() {
      this.roundBattle++;
      const attValue = randomNumber(13, 7);
      if (this.mHealth < attValue) {
        this.mHealth -= this.mHealth;
      } else {
        this.mHealth -= attValue;
      }
      this.addLogBattle("Player", "Attack", attValue);
      this.attPlayer();
    },
    attPlayer() {
      const attValue = randomNumber(18, 9);
      if (this.pHealth < attValue) {
        this.pHealth -= this.pHealth;
      } else {
        this.pHealth -= attValue;
      }
      this.addLogBattle("Monster", "Attack", attValue);
    },
    specialAttack() {
      this.roundBattle++;
      const attValue = randomNumber(30, 15);
      if (this.mHealth < attValue) {
        this.mHealth -= this.mHealth;
      } else {
        this.mHealth -= attValue;
      }
      this.addLogBattle("Player", "Kamehameha", attValue);
      this.attPlayer();
    },
    healPlayer() {
      this.roundBattle++;
      const healValue = randomNumber(25, 10);
      if (this.pHealth + healValue > 100) {
        this.pHealth = this.pHealth + (100 - this.pHealth);
      } else {
        this.pHealth += healValue;
      }
      this.addLogBattle("Player", "Heal", healValue);
      this.attPlayer();
    },
    newGame() {
      this.pHealth = 100;
      this.mHealth = 100;
      this.roundBattle = 0;
      this.statusBattle = null;
      this.battleLog = [];
    },
    surrender() {
      this.statusBattle = "Surrender";
    },
    addLogBattle(x, y, z) {
      // unshift sama seperti pust tetapi unshift menambahkan di awal array
      this.battleLog.unshift({
        actionBy: x,
        actionType: y,
        actionValue: z,
      });
    },
  },
});

app.mount("#game");
