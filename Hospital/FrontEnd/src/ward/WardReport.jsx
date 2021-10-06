import jsPDF from "jspdf";
import "jspdf-autotable";

const generateWardPDF = (wards) => {
  const document = new jsPDF();

  const tableColumn = [
    "Ward Name",
    "Building",
    "Floor",
    "Reg Date",
    "Ward Num",
    "Discharge",
    "DisDate",
    "Available Room",
    "Room Category",
    "Room Num",
    "Bed Number",
  ];
  const tableRows = [];
  if(wards && wards.length > 0) {
    wards.forEach((ward) => {
        const dataRow = [
            ward.wardName,
            ward.building,
            ward.floor,
            ward.regDate.slice(0,10),
            ward.wardNum,
            ward.discharge,
            ward.disDate.slice(0,10),
            ward.availableRoom,
            ward.roomCategory,
            ward.roomNum,
            ward.bedNumber,
        ];
        tableRows.push(dataRow);
    });
    document.autoTable(tableColumn, tableRows, { startY: 20 });
        const date = Date().split(" ");

        const dateStr =
        date[0] + date[1] + date[2] + date[3] + date[4] + date[5] + date[6];
        // ticket title. and margin-top + margin-left
        document.text("Detail Order Report", 14, 15);
        // we define the name of our PDF file.
        document.save(`report_${dateStr}.pdf`);
}
};

export default generateWardPDF;