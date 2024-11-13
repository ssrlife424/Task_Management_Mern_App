// import CommonForm from "../common-form";
// import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

// function CommonDialog({
//   showDialog,
//   onOpenChange,
//   title,
//   formControls,
//   btnText,
//   handleSubmit,
//   formData,
// }) {
//   return (
//     <Dialog 
//     open={showDialog} 
//     onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-screen h-[450px] overflow-auto">
//         <DialogTitle>{title}</DialogTitle>
//         <div>
//           <CommonForm
//             formControls={formControls}
//             form={formData}
//             handleSubmit={handleSubmit}
//             btnText={btnText}
//           />
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default CommonDialog;


import CommonForm from "../common-form";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

function CommonDialog({
  showDialog,
  onOpenChange,
  title,
  formControls,
  btnText,
  handleSubmit,
  formData,
  description, // Add a prop for description
}) {
  return (
    <Dialog 
      open={showDialog} 
      onOpenChange={onOpenChange} 
      aria-describedby="dialog-description"
    >
      <DialogContent className="sm:max-w-screen h-[450px] overflow-auto">
        <DialogTitle>{title}</DialogTitle>
        <p id="dialog-description" className="sr-only">
          {description} {/* Use the description prop */}
        </p>
        <div>
          <CommonForm
            formControls={formControls}
            form={formData}
            handleSubmit={handleSubmit}
            btnText={btnText}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CommonDialog;