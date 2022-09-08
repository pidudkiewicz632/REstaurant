export const productValidation = {
  file: (data) => {
    if (!data) {
      return {
        state: false,
        message: "This field is required!",
      };
    }

    const ext = data.name.split(".").pop().toUpperCase();
    const allowedExts = ["JPG", "PNG"];
    const isAllowed = allowedExts.indexOf(ext);

    if (isAllowed < 0) {
      return {
        state: false,
        message: "This type of file is not allowed!",
      };
    }
    return {
      state: true,
      message: "",
    };
  },
  title: (data) => {
    if (data.length < 3 || data.length > 60) {
      return {
        state: false,
        message: "This field must be 3 to 60 characters long.",
      };
    }
    if (!/^[a-zA-Z0-9 -]*$/.test(data)) {
      return {
        state: false,
        message: "Illegal characters were used!",
      };
    }
    return {
      state: true,
      message: "",
    };
  },
  desc: (data) => {
    if (data.length < 10 || data.length > 2000) {
      return {
        state: false,
        message: "This field must be 10 to 200 characters long.",
      };
    }

    if (!/^[a-zA-Z0-9 .,-:]*$/.test(data)) {
      return {
        state: false,
        message: "Illegal characters were used!",
      };
    }
    return {
      state: true,
      message: "",
    };
  },
  categories: (data) => {
    const selectedCategories = Object.entries(data)
      .filter(([key, value]) => {
        return value;
      })
      .map(([key, value]) => key);

    if (!selectedCategories.length) {
      return {
        state: false,
        message: "Select at least one category!",
      };
    }
    return {
      state: true,
      message: "",
    };
  },
  extra: (data) => {
    if (!data) {
      return {
        state: false,
        message: "All fields are required.",
      };
    }

    if (Number(data.price) <= 0) {
      return {
        state: false,
        message: "Price must be greater than 0.",
      };
    }

    if (data.length < 3 || data.length > 20) {
      return {
        state: false,
        message: "This field must be 3 to 20 characters long.",
      };
    }

    if (!/^[a-zA-Z0-9]*$/.test(data.text)) {
      return {
        state: false,
        message: "Illegal characters were used!",
      };
    }

    return {
      state: true,
      message: "",
    };
  },
  price: (data) => {
    if (Number(data) <= 0) {
      return {
        state: false,
        message: "Price must be greater than 0.",
      };
    }

    return {
      state: true,
      message: "",
    };
  },
  prices: function (data) {
    const numberOfPrices = data.filter((item) => item).length;

    if (numberOfPrices < 3) {
      return {
        state: false,
        message: "All fields are required.",
      };
    }

    for (let item of data) {
      const { state } = this.price(item);

      if (!state) {
        return state;
      }
    }
    return {
      state: true,
      message: "",
    };
  },
  extraOptions: function (data) {
    for (let item of data) {
      const { state } = this.extra(item);
      if (!state) {
        return state;
      }
    }

    return {
      state: true,
      message: "",
    };
  },
};
