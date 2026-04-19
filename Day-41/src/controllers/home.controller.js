const homeController = {
  index: (req, res) => {
    res.render('home', {
      title: 'Trang chủ',
      layout: 'layouts/main',
    });
  },
};

module.exports = homeController;