"use client";

const useCopyText = (text: string) => {
  const copyText = () => {
    navigator.clipboard.writeText(text || "");
    /*    toast({
      title: "ID copié",
      description: "L'ID de la salle a été copié dans le presse-papiers",
    }); */
  };
};

export default useCopyText;
