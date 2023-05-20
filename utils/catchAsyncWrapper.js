const catchAsyncWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// const catchAsyncWrapper = (controller) => {
//   return (req, res, next) => {
//     controller(req, res).catch(next);
//   };
// };

module.exports = {
  catchAsyncWrapper,
};

// https://lucymarmitchell.medium.com/using-then-catch-finally-to-handle-errors-in-javascript-promises-6de92bce3afc
