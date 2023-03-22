export default function Print() {
    const printClick = () => {
        window.print();
    }
    return (
        <button onClick={printClick}>
          Print
        </button>
      );
}


