import { HttpStatus } from '../config/constants.js';
import Supplier from '../models/supplierModel.js';

export async function listSuppliers(_req, res) {
  const suppliers = await Supplier.find({ isActive: true }).sort({ name: 1 });
  return res.status(HttpStatus.OK).json({ success: true, suppliers });
}

export async function getSupplier(req, res) {
  const supplier = await Supplier.findOne({ slug: req.params.slug, isActive: true });
  if (!supplier) {
    return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Supplier not found' });
  }
  return res.status(HttpStatus.OK).json({ success: true, supplier });
}

export async function createSupplier(req, res) {
  const supplier = await Supplier.create(req.body);
  return res.status(HttpStatus.CREATED).json({ success: true, supplier });
}

export async function updateSupplier(req, res) {
  const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!supplier) {
    return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Supplier not found' });
  }
  return res.status(HttpStatus.OK).json({ success: true, supplier });
}

export async function archiveSupplier(req, res) {
  const supplier = await Supplier.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true, runValidators: true },
  );
  if (!supplier) {
    return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Supplier not found' });
  }
  return res.status(HttpStatus.OK).json({ success: true, message: 'Supplier deleted', supplier });
}
