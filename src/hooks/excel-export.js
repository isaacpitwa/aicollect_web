import { useContext } from 'react';
import { ExcelExportContext } from '../contexts/export-context';

export const useExcelExport = () => useContext(ExcelExportContext);
